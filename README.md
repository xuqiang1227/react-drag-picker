# react-drag-picker
> drag select element by react.

### install 
```bash
npm i react-drag-picker --save
```

### using

```js 
import DragPicker from 'react-drag-picker';

<DragPicker><div></div></DragPicker>
```

### props
  * onChange: function, return selected item key values
  * selectedStyle: Object, selected style. default: `{backgroundColor: '#64B5F6', color: 'white'}`
  * className: string, parent class name

### example

```js
<DragPicker onChange={key => console.log(key)}>
  {
    Array.from({length: 65}, (v, k) => k).map(i => <div className={'select-box'} key={i}>Item {i + 1 }</div>)
  }
</DragPicker>
```
![](https://static.oschina.net/uploads/img/201712/21160621_lyob.png)

Project form [react-drag-select](https://github.com/pablofierro/react-drag-select)