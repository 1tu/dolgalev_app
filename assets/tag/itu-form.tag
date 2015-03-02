// <form-item>
//   <p>{ parent.item.prop.title }</p>

//   this.input = fn.createFormItem(this.parent.item.key, this.parent.item.prop)
//   this.input.onchange = function () {
//     this.parent.parent.onChange(this)
//     return 2
//   }.bind(this)

//   this.on('mount', function() {
//     console.log('MOUNT');
//     this.root.appendChild( this.input )
//   });

// </form-item>

// <itu-form>
//   <form-item each={ key, prop in data.list } key={ key } prop={ prop }/>
//   <button class={ 'connect' + (checkFields()? ' ' : ' disabled') } onclick={ submit }>{ data.submitTitle }</button>

//   var t = this
//     , rc = RiotControl
//     , s = stores
//     , parent = t.parent.parent
//     , cls = t.opts.data.itemClass

//   t.data = t.opts.data
//   t.itemClass = t.data.itemClass

//   console.log(t.data);

//   checkFields(query) {
//     for (var key in t.data.list) {
//       var input = t.data.list[key]
//       if (input.required && !input.value) return false;
//       query && input.value && (query[key] = input.value)
//     }
//     return true
//   }

//   onChange(el) {
//     var input = el.input
//       , val = input.value
//       , prop = t.data.list[ el.parent.key ]

//     if (input.value) {
//       if (!prop.pattern || (prop.pattern && val.search(prop.pattern) !== -1 )) {
//         prop.value = val
//         input.className = 'valid'  
//       }
//       else {
//         prop.value = null
//         input.className = 'invalid'
//       }
//     }else{
//       prop.value = null
//       if (prop.required) input.className = 'invalid' 
//       else input.className = '' 
//     }
//   }

//   submit(){
//     var query = {}
//     if (!t.checkFields(query)) return
//     t.data.onSubmit(query)
//   }

// </itu-form>

// fn.onChange = function (el) {
//     var input = el.input
//       , val = input.value
//       , prop = t.data.list[ el.parent.key ]

//     if (input.value) {
//       if (!prop.pattern || (prop.pattern && val.search(prop.pattern) !== -1 )) {
//         prop.value = val
//         input.className = 'valid'  
//       }
//       else {
//         prop.value = null
//         input.className = 'invalid'
//       }
//     }else{
//       prop.value = null
//       if (prop.required) input.className = 'invalid' 
//       else input.className = '' 
//     }
//   }