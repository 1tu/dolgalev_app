<form-item>
  <div name="test" class="form-item">
    <p>{ prop.title }</p>
  </div>

  var t = this
    , rc = RiotControl
    , s = stores
    , parent = t.parent.parent

  t.name = t.opts.data.item.name
  t.prop = t.opts.data.item.prop

  onChange() {
    var val = t.input.value
    if (val) {
      if (!t.prop.pattern || (t.prop.pattern && val.search(t.prop.pattern) !== -1 )) {
        parent.trigger(parent._name, {name: t.name, value: val})
        t.input.className = 'valid'  
      }
      else {
        parent.trigger(parent._name, {name: t.name})
        t.input.className = 'invalid'
      }
    }else{
      parent.trigger(parent._name, {name: t.name})
      if (t.prop.required) t.input.className = 'invalid' 
      else t.input.className = '' 
    }
  }

  t.on('mount', function() {
    t.input = fn.createFormItem(t.name, t.prop)
    t.test.appendChild( t.input )
    t.input.onchange = t.onChange
    t.input.onfocus = fn.onFocus
    t.input.onblur = fn.onBlur
    t.onChange()
  });

</form-item>