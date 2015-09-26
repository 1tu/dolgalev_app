<form-item>
	<p>{ title }</p>
	<div if={ invalids } class="invalid_reasons">
		<p each={ reason in invalids }>{ reason }</p>
	</div>

	var t = this
		, rc = RiotControl
		, s = stores

	onChange() {
		var val = t.input.value
		if (val) {
			if (!t.pattern || (t.pattern && val.search(t.pattern) !== -1 )) {
				t.parent.data.query[ t.name ] = val
				t.input.className = 'valid'  
			}else {
				delete t.parent.data.query[ t.name ]
				t.input.className = 'invalid'
			}
		}else{
			delete t.parent.data.query[ t.name ]
			if (t.required) t.input.className = 'invalid' 
			else t.input.className = '' 
		}
		t.parent.parent.update()
	}

	rc.on('form_invalid', function (data) {
		if (!data[ t.name ]) return
		t.update({invalids: data[ t.name ]})
	})

	t.on('mount', function() {
		t.input = fn.createFormItem(t)
		t.root.insertBefore( t.input, t.root.firstChild.nextSibling )
		t.input.onchange = t.onChange
		t.input.onkeyup = t.onChange
		t.input.onfocus = fn.onFocus
		t.input.onblur = fn.onBlur
		t.onChange()
	});

</form-item>