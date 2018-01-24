# react-drag-picker
> drag select element by react.

[![npm](https://img.shields.io/npm/v/react-drag-picker.svg?maxAge=2592000?style=plastic)](https://www.npmjs.com/package/react-drag-picker)
[![NPM downloads](http://img.shields.io/npm/dm/react-drag-picker.svg?style=flat-plastic)](https://npmjs.org/package/react-drag-picker)

### install 
```bash
npm i react-drag-picker --save
```

### using

```js 
import DragPicker from 'react-drag-picker';

const styles = {position: 'relative'};

<div style={styles}>
  <DragPicker>
    <div key="1">1</div>
    <div key="2">2</div>
    <div key="3">3</div>
  </DragPicker>
</div>
```

### props
  * onChange: function, return selected item key values
  * selectedStyle: Object, selected style. default: `{backgroundColor: '#64B5F6', color: 'white'}`
  * className: string, parent dom(`div`) class name
  * selectionBoxStyle: selected box style
  * clearAll: function. clear selected item.
  * enabled: boolean. 
  * id: string, parent dom id.
  * disabledkeys: array, don't allow to select items key. eg: ['11', '17']
  * maxLength: selected max number
  * skipDisabled: boolean. Skips disabled items whether to continue selecting items

### example

```js
import DragPicker from 'react-drag-picker';

const styles = {position: 'relative'};

<div style={styles}>
  <DragPicker>
    {
      Array.from({length: 10}, (v, k) => k).map(i => <div className={'select-box'} key={i}>{i + 1 }</div>)
    }
  </DragPicker>
</div>
```
```css
.select-box {
  background: #f0f0f0;
  width: 30px;
  height: 120px;
  text-align: center;
  line-height: 104px;
  display: inline-block;
  font-size: 14px;
  color: #5A5A5A;
  box-sizing: border-box;
  border: 1px solid #5A5A5A;
}
```
![](https://static.oschina.net/uploads/img/201712/22142737_dShD.gif )

Project form [react-drag-select](https://github.com/pablofierro/react-drag-select)