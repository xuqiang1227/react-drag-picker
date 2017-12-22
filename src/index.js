import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import DragPicker from './DragPicker.jsx';
import registerServiceWorker from './registerServiceWorker';



ReactDOM.render(<div className="root"><DragPicker onChange={d => console.log(d)}>
  {
    Array.from({length: 10}, (v, k) => k).map(i => <div className={'select-box'} key={i}>{i + 1 }</div>)
  }
</DragPicker></div>, document.getElementById('root'));
registerServiceWorker();
