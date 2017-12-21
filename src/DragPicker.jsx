import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
class DragPicker extends React.PureComponent {

  constructor() {
    super(...arguments);
    this.state = {
      mouseDown: false,
      startPoint: null,
      endPoint: null,
      selectionBox: null,
      selectedItems: {},
      appendMode: false
    };
    this.selectedChildren = {};
  }

  componentWillReceiveProps(np) {
    let nextState = {};
    if(!np.enabled) {
      np.selectedItems = {};
    }
    this.setState(nextState);
  }

  componentDidUpdate() {
    if(this.state.mouseDown && this.state.selectionBox) {
      this.updateCollidingChildren(this.state.selectionBox);
    }
  }

  onMouseDown(e) {
    if(!this.props.enabled || e.button === 2 || e.nativeEvent.which === 2) {
      return;
    }
    let nextState = {};
    if(e.ctrlKey || e.altKey || e.shiftKey) {
      nextState.appendMode = true;
    }
    nextState.mouseDown = true;
    nextState.startPoint = {
      x: e.pageX,
      y: e.pageY
    };
    this.setState(nextState);
    window.document.addEventListener('mousemove', e => this.onMouseMove(e));
    window.document.addEventListener('mouseup', e => this.onMouseUp(e));
  }

  onMouseUp(e) {
    window.document.removeEventListener('mousemove', e => this.onMouseMove(e));
    window.document.removeEventListener('mouseup', e => this.onMouseUp(e));
    this.setState({
      mouseDown: false,
      startPoint: null,
      endPoint: null,
      selectionBox: null,
      appendMode: false
    });
    this.props.onChange && this.props.onChange.call(null, Object.keys(this.selectedChildren));
  }

  onMouseMove(e) {
    e.preventDefault();
    if(this.state.mouseDown) {
      let endPoint = {
        x: e.pageX,
        y: e.pageY
      };
      this.setState({
        endPoint: endPoint,
        selectionBox: this.calculateSelectionBox(this.state.startPoint, endPoint)
      });
    }
  }

  render() {
    return(
      <div style={{position: 'relative'}} className={this.props.className || ''} ref='selectionBox' onMouseDown={e => this.onMouseDown(e)}>
        {this.renderItem()}
        {this.renderPickerBox()}
      </div>
    );
  }

  renderItem() {
    let index = 0;
    const {selectedStyle} = this.props;
    return React.Children.map(this.props.children, (child) => {
      let tmpKey = !child.key ? index++ : child.key;
      let isSelected = Object.keys(this.selectedChildren).some(i => i === tmpKey);
      return React.cloneElement(child, {
        ref: tmpKey,
        style: isSelected ? selectedStyle : {},
        onClickCapture: (e) => {
          if((e.ctrlKey || e.altKey || e.shiftKey) && this.props.enabled) {
            e.preventDefault();
            e.stopPropagation();
            this.selectItem(tmpKey, !Object.keys(this.selectedChildren).some(i => i === tmpKey));
          }
        }
      });
    });
  }

  
  renderPickerBox() {
    if(!this.state.mouseDown || !this.state.endPoint || !this.state.startPoint) {
      return null;
    }
    const {selectionBox} = this.state;
    if(selectionBox) {
      selectionBox.background = 'rgba(0, 162, 255, 0.4)';
      selectionBox.position = 'absolute';
      selectionBox.zIndex = 99;
    }
    return(
      <div style={selectionBox}></div>
    );
  }

  
  selectItem(key, isSelected) {
    if(isSelected) {
      this.selectedChildren[key] = isSelected;
    }
    else {
      delete this.selectedChildren[key];
    }
    this.props.onChange.call(null, Object.keys(this.selectedChildren));
    this.forceUpdate();
  }

  
  boxIntersects(boxA, boxB) {
    if(boxA.left <= boxB.left + boxB.width &&
      boxA.left + boxA.width >= boxB.left &&
      boxA.top <= boxB.top + boxB.height &&
      boxA.top + boxA.height >= boxB.top) {
      return true;
    }
    return false;
  }

  
  updateCollidingChildren(selectionBox) {
    let tmpNode = null;
    let tmpBox = null;
    this.refs && Object.keys(this.refs).forEach((key) => {
      const ref = this.refs[key];
      if(key !== 'selectionBox') {
        tmpNode = ReactDOM.findDOMNode(ref);
        tmpBox = {
          top: tmpNode.offsetTop,
          left: tmpNode.offsetLeft,
          width: tmpNode.clientWidth,
          height: tmpNode.clientHeight
        };
        if(this.boxIntersects(selectionBox, tmpBox)) {
          this.selectedChildren[key] = true;
        }
        else {
          if(!this.state.appendMode) {
            delete this.selectedChildren[key];
          }
        }
      }
    });
  }


  calculateSelectionBox(startPoint, endPoint) {
    if(!this.state.mouseDown || !endPoint || !startPoint) {
      return null;
    }
    let parentNode = this.refs.selectionBox.parentNode;
    let left = Math.min(startPoint.x, endPoint.x) - parentNode.offsetLeft;
    let top = Math.min(startPoint.y, endPoint.y) - parentNode.offsetTop;
    let width = Math.abs(startPoint.x - endPoint.x);
    let height = Math.abs(startPoint.y - endPoint.y);
    return {
      left: left,
      top: top,
      width: width,
      height: height
    };
  }
}

DragPicker.propTypes = {
  enabled: PropTypes.bool,
  onChange: PropTypes.func,
  selectedStyle: PropTypes.object,
  className: PropTypes.string
};

DragPicker.defaultProps = {
  enabled: true,
  onChange: () => {},
  selectedStyle: {backgroundColor: '#64B5F6', color: 'white'},
  className: ''
};

export default DragPicker;
