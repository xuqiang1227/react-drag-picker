!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t(require("react"),require("react-dom"));else if("function"==typeof define&&define.amd)define(["react","react-dom"],t);else{var n="object"==typeof exports?t(require("react"),require("react-dom")):t(e.react,e["react-dom"]);for(var o in n)("object"==typeof exports?exports:e)[o]=n[o]}}("undefined"!=typeof self?self:this,function(e,t){return function(e){function t(o){if(n[o])return n[o].exports;var s=n[o]={i:o,l:!1,exports:{}};return e[o].call(s.exports,s,s.exports,t),s.l=!0,s.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},a=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),u=n(1),c=o(u),p=n(2),f=o(p),d=n(7),h=o(d),y=function(e){function t(){s(this,t);var e=r(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments));return e.state={mouseDown:!1,startPoint:null,endPoint:null,selectionBox:null,selectedItems:{},appendMode:!1,skip:!0},e.selectedChildren={},e.onMouseMove=e.onMouseMove.bind(e),e.onMouseUp=e.onMouseUp.bind(e),e}return i(t,e),a(t,[{key:"componentWillReceiveProps",value:function(e){var t={};e.enabled||(e.selectedItems={}),this.setState(t)}},{key:"componentDidUpdate",value:function(){this.state.mouseDown&&this.state.selectionBox&&this.updateCollidingChildren(this.state.selectionBox)}},{key:"onMouseDown",value:function(e){if(this.props.enabled&&2!==e.button&&2!==e.nativeEvent.which){var t={};(e.ctrlKey||e.altKey||e.shiftKey)&&(t.appendMode=!0),t.mouseDown=!0,t.startPoint={x:e.pageX,y:e.pageY},this.setState(t),window.document.addEventListener("mousemove",this.onMouseMove),window.document.addEventListener("mouseup",this.onMouseUp)}}},{key:"onMouseUp",value:function(e){window.document.removeEventListener("mousemove",this.onMouseMove),window.document.removeEventListener("mouseup",this.onMouseUp),this.setState({mouseDown:!1,startPoint:null,endPoint:null,selectionBox:null,appendMode:!1,skip:!0}),this.props.onChange(Object.keys(this.selectedChildren))}},{key:"onMouseMove",value:function(e){if(e.preventDefault(),this.state.mouseDown){var t={x:e.pageX,y:e.pageY};this.setState({endPoint:t,selectionBox:this.calculateSelectionBox(this.state.startPoint,t)})}}},{key:"render",value:function(){var e=this,t=0,n=this.props,o=n.children,s=n.selectedStyle,r=n.id,i=n.className,a=n.disabledkeys,u=n.disabledClass,p=this.state,f=p.mouseDown,d=p.endPoint,h=p.startPoint,y=p.selectionBox,m=this.props.selectionBoxStyle;return c.default.createElement("div",{style:{position:"relative"},id:r,className:i||void 0,ref:"selectionBox",onMouseDown:function(t){return e.onMouseDown(t)}},c.default.Children.map(o,function(n){var o=n.key?n.key:t++,r=Object.keys(e.selectedChildren).some(function(e){return e===o});return c.default.cloneElement(n,{ref:o,className:a.some(function(e){return e===o})?n.props.className+" "+u:n.props.className,style:r?l({},s,n.props.style):l({},n.props.style),onClickCapture:function(t){(t.ctrlKey||t.altKey||t.shiftKey)&&e.props.enabled&&(t.preventDefault(),t.stopPropagation(),e.selectItem(o,!Object.keys(e.selectedChildren).some(function(e){return e===o})))}})}),f&&d&&h&&c.default.createElement("div",{style:l({},m,y)}))}},{key:"selectItem",value:function(e,t){if(t){if(this.props.maxLength&&this.props.maxLength<=Object.keys(this.selectedChildren).length||!this.state.skip)return!1;if(this.props.disabledkeys.some(function(t){return t===e}))return this.props.skipDisabled||this.setState({skip:!1}),!1;this.selectedChildren[e]=t}else delete this.selectedChildren[e];this.props.onChange(Object.keys(this.selectedChildren)),this.forceUpdate()}},{key:"clearAll",value:function(){this.selectedChildren={},this.props.onChange(Object.keys(this.selectedChildren)),this.forceUpdate()}},{key:"boxIntersects",value:function(e,t){return e.left<=t.left+t.width&&e.left+e.width>=t.left&&e.top<=t.top+t.height&&e.top+e.height>=t.top}},{key:"updateCollidingChildren",value:function(e){var t=this,n=null,o=null;this.refs&&Object.keys(this.refs).forEach(function(s){var r=t.refs[s];if("selectionBox"!==s)if(n=h.default.findDOMNode(r),o={top:n.offsetTop,left:n.offsetLeft,width:n.clientWidth,height:n.clientHeight},t.boxIntersects(e,o)){if(t.props.maxLength&&t.props.maxLength<=Object.keys(t.selectedChildren).length||!t.state.skip)return!1;if(t.props.disabledkeys.some(function(e){return e===s}))return t.props.skipDisabled||t.setState({skip:!1}),!1;t.selectedChildren[s]=!0}else t.state.appendMode||delete t.selectedChildren[s]})}},{key:"calculateSelectionBox",value:function(e,t){if(!this.state.mouseDown||!t||!e)return null;var n=this.refs.selectionBox.parentNode;return{left:Math.min(e.x,t.x)-n.offsetLeft,top:Math.min(e.y,t.y)-n.offsetTop,width:Math.abs(e.x-t.x),height:Math.abs(e.y-t.y)}}}]),t}(c.default.PureComponent);y.propTypes={enabled:f.default.bool,onChange:f.default.func.isRequired,selectedStyle:f.default.object,className:f.default.string,selectionBoxStyle:f.default.object,id:f.default.string,maxLength:f.default.number,disabledkeys:f.default.array,skipDisabled:f.default.bool,disabledClass:f.default.string},y.defaultProps={enabled:!0,onChange:function(){},selectedStyle:{backgroundColor:"#64B5F6",color:"white"},className:"",id:"selectionBox",maxLength:0,disabledkeys:[],skipDisabled:!1,selectionBoxStyle:{background:"rgba(0, 162, 255, 0.4)",position:"absolute",zIndex:1e5},disabledClass:""},t.default=y},function(t,n){t.exports=e},function(e,t,n){e.exports=n(3)()},function(e,t,n){"use strict";var o=n(4),s=n(5),r=n(6);e.exports=function(){function e(e,t,n,o,i,l){l!==r&&s(!1,"Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types")}function t(){return e}e.isRequired=e;var n={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t};return n.checkPropTypes=o,n.PropTypes=n,n}},function(e,t,n){"use strict";function o(e){return function(){return e}}var s=function(){};s.thatReturns=o,s.thatReturnsFalse=o(!1),s.thatReturnsTrue=o(!0),s.thatReturnsNull=o(null),s.thatReturnsThis=function(){return this},s.thatReturnsArgument=function(e){return e},e.exports=s},function(e,t,n){"use strict";function o(e,t,n,o,r,i,l,a){if(s(t),!e){var u;if(void 0===t)u=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var c=[n,o,r,i,l,a],p=0;u=new Error(t.replace(/%s/g,function(){return c[p++]})),u.name="Invariant Violation"}throw u.framesToPop=1,u}}var s=function(e){};e.exports=o},function(e,t,n){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(e,n){e.exports=t}])});