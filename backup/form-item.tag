// <form-item>
//   <div name="test" class="form-item">
//     <p>{ prop.title }</p>
//   </div>

//   var t = this
//     , rc = RiotControl
//     , s = stores
//     , parent = t.parent.parent

//   t.name = t.opts.data.name
//   t.prop = t.opts.data.prop

//   onChange() {
//     var val = t.input.value
//     if (val) {
//       if (!t.prop.pattern || (t.prop.pattern && val.search(t.prop.pattern) !== -1 )) {
//         parent.setInput({name: t.name, value: val})
//         t.input.className = 'valid'  
//       }
//       else {
//         parent.setInput({name: t.name})
//         t.input.className = 'invalid'
//       }
//     }else{
//       parent.setInput({name: t.name})
//       if (t.prop.required) t.input.className = 'invalid' 
//       else t.input.className = '' 
//     }
//   }


//   t.on('unmount', function () {
//     console.log('UNMOUNT!');
//   })

//   t.on('mount', function() {
//     console.log('MOUNT!');
//     t.input = fn.createFormItem(t.name, t.prop)
//     t.test.appendChild( t.input )
//     t.input.onchange = t.onChange
//     t.onChange()
//   });

// </form-item>