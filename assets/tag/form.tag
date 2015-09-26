<itu-form>
  <form-item each={ data.items }></form-item>
	<yield/>
	<button class={ 'connect' + (checkFields(data)? ' ' : ' disabled') } onclick={ submit.bind(this, formData) }>{ data.submit.name }</button>

	var t = this
		, rc = RiotControl
		, s = stores

	t.data = t.opts.data

	checkFields() {
		for (var i = 0, item; (item = t.data.items[i]); i++) 
			if (item.required && !t.data.query[ item.name ]) return false

		if (t.data.compare && (t.data.query[ t.data.compare[0] ] !== t.data.query[ t.data.compare[1] ]) ) 
			return false

		return true
	}

	submit() {
		if (!t.checkFields()) return
		rc.trigger(t.data.submit.event, t.data.query)
	}

</itu-form>