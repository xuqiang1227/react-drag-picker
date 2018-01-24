# react-drag-picker
> drag select element by react.

[![npm](https://img.shields.io/npm/v/react-drag-picker.svg?maxAge=2592000?style=plastic)](https://www.npmjs.com/package/react-drag-picker)
[![NPM downloads](http://img.shields.io/npm/dm/react-drag-picker.svg?style=flat-plastic)](https://npmjs.org/package/react-drag-picker)

### example

![](https://static.oschina.net/uploads/img/201712/22142737_dShD.gif )

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

| props name | type | description | default | isRequired
|------------|------|-------------------------------------------------|---------|----|
|onChange|function|return selected item key values| `() => {}`| true |
|selectedStyle|Object|selected style|`{backgroundColor: '#64B5F6', color: 'white'}`|false|
|className|string|parent dom(`div`) class name|`''`|false|
|selectionBoxStyle|Object|selected box style|`{background: 'rgba(0, 162, 255, 0.4)', position: 'absolute', zIndex: 100000}`|false|
|clearAll|function|clear selected item|`() => {}`|false|
|enabled|boolean|can enabled|`true`|false|
|id|string|parent dom id|`selectionBox`|false|
|disabledkeys|array|don't allow to select items key. eg: ['11', '17']|`[]`|false|
|maxLength|number|selected max number, `0` is no limited|`0`|false|
|skipDisabled|boolean|Skips disabled items whether to continue selecting items|`false`|false|



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

Project form [react-drag-select](https://github.com/pablofierro/react-drag-select)