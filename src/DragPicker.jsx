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
      appendMode: false,
      skip: true
    };
    this.selectedChildren = {};
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
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

  componentWillUnmount() {
    document.getElementById(this.props.id).parentNode.removeChild(document.getElementById(this.props.id));
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
    window.document.addEventListener('mousemove', this.onMouseMove);
    window.document.addEventListener('mouseup', this.onMouseUp);
  }

  onMouseUp(e) {
    window.document.removeEventListener('mousemove', this.onMouseMove);
    window.document.removeEventListener('mouseup', this.onMouseUp);
    this.setState({
      mouseDown: false,
      startPoint: null,
      endPoint: null,
      selectionBox: null,
      appendMode: false,
      skip: true
    });
    this.props.onChange(Object.keys(this.selectedChildren));
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
    let index = 0;
    const {children, selectedStyle, id, className, disabledkeys, disabledClass} = this.props;
    const {mouseDown, endPoint, startPoint, selectionBox} = this.state;
    let {selectionBoxStyle} = this.props;
    return(
      <div style={{position: 'relative'}} id={id} className={className || undefined} ref='selectionBox' onMouseDown={e => this.onMouseDown(e)}>
        {
          React.Children.map(children, child => {
            let tmpKey = !child.key ? index++ : child.key;
            let isSelected = Object.keys(this.selectedChildren).some(i => i === tmpKey);
            return React.cloneElement(child, {
              ref: tmpKey,
              className: disabledkeys.some(k => k === tmpKey) ? child.props.className + ' ' + disabledClass: child.props.className,
              style: isSelected ? {...selectedStyle, ...child.props.style} : {...child.props.style},
              onClickCapture: (e) => {
                if((e.ctrlKey || e.altKey || e.shiftKey) && this.props.enabled) {
                  e.preventDefault();
                  e.stopPropagation();
                  this.selectItem(tmpKey, !Object.keys(this.selectedChildren).some(i => i === tmpKey));
                }
              }
            });
          })
        }
        {
          mouseDown && endPoint && startPoint && <div style={{...selectionBoxStyle, ...selectionBox}} />
        }
      </div>
    );
  }

  
  selectItem(key, isSelected) {
    if(isSelected) {
      if((this.props.maxLength && this.props.maxLength <= Object.keys(this.selectedChildren).length)
       || !this.state.skip) {
        return false;
      }
      if(this.props.disabledkeys.some(k => k === key)) {
        if(!this.props.skipDisabled) {
          this.setState({skip: false});
        }
        return false;
      }
      this.selectedChildren[key] = isSelected;
    }
    else {
      delete this.selectedChildren[key];
    }
    this.props.onChange(Object.keys(this.selectedChildren));
    this.forceUpdate();
  }

  clearAll() {
    this.selectedChildren = {};
    this.props.onChange(Object.keys(this.selectedChildren));
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
          if((this.props.maxLength && this.props.maxLength <= Object.keys(this.selectedChildren).length)
           || !this.state.skip) {
            return false;
          }
          if(this.props.disabledkeys.some(k => k === key)) {
            if(!this.props.skipDisabled) {
              this.setState({skip: false});
            }
            return false;
          }
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
    let parentNode = this.refs.selectionBox ? this.refs.selectionBox.parentNode : document.getElementById(this.props.id).parentNode;
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
  onChange: PropTypes.func.isRequired,
  selectedStyle: PropTypes.object,
  className: PropTypes.string,
  selectionBoxStyle: PropTypes.object,
  id: PropTypes.string,
  maxLength: PropTypes.number,
  disabledkeys: PropTypes.array,
  skipDisabled: PropTypes.bool,
  disabledClass: PropTypes.string,
};

DragPicker.defaultProps = {
  enabled: true,
  onChange: () => {},
  selectedStyle: {backgroundColor: '#64B5F6', color: 'white'},
  className: '',
  id: 'selectionBox',
  maxLength: 0,
  disabledkeys: [],
  skipDisabled: false,
  selectionBoxStyle: {background: 'rgba(0, 162, 255, 0.4)', position: 'absolute', zIndex: 100000},
  disabledClass: ''
};

export default DragPicker;
