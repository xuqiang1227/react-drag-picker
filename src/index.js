import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import DragPicker from './DragPicker.jsx';
import registerServiceWorker from './registerServiceWorker';



ReactDOM.render(<div className="root"><DragPicker ref={r => this.picker = r} onChange={d => console.log(d)}>
  {
    Array.from({length: 10}, (v, k) => k).map(i => <div className={'select-box'} key={i}>{i + 1 }</div>)
  }
</DragPicker><button onClick={() => this.picker.clearAll()}>清除</button></div>, document.getElementById('root'));
registerServiceWorker();
