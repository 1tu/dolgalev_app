<form-item>
  <p>{ parent.title }</p>
  <div if={ invalids } class="invalid_reasons">
    <p each={ reason in invalids }>{ reason }</p>
  </div>

  var t = this
    , rc = RiotControl
    , s = stores
    , parent = t.parent.parent

  t.src = t.opts.src

  onChange() {
    var val = t.input.value
    if (val) {
      if (!t.parent.pattern || (t.parent.pattern && val.search(t.parent.pattern) !== -1 )) {
        parent[ t.src ].query[ t.name ] = val
        t.input.className = 'valid'  
      }else {
        delete parent[ t.src ].query[ t.name ]
        t.input.className = 'invalid'
      }
    }else{
      delete parent[ t.src ].query[ t.name ]
      if (t.parent.required) t.input.className = 'invalid' 
      else t.input.className = '' 
    }
  parent.update()
  }

  rc.on('form_invalid', function (data) {
    if (!data[ t.name ]) return
    console.log('form INVALID! ', data[ t.name ]);
    t.update({invalids: data[ t.name ]})
  })

  t.on('mount', function() {
    t.input = fn.createFormItem(t.parent)
    t.root.insertBefore( t.input, t.root.firstChild.nextSibling )
    t.input.onchange = t.onChange
    t.input.onfocus = fn.onFocus
    t.input.onblur = fn.onBlur
    t.onChange()
  });

</form-item>