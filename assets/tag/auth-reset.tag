<auth-reset>
	<p class="tm nmt">Ключ для восстановления пароля прийдет на почту на которую зарегистрирован аккаунт</p>
	<itu-form data={ formData }></itu-form>
	<p class="tm" style="margin-top: 2em">Если у вас уже есть ключ - вы можете сменить пароль</p>
	<itu-form data={ formPass }></itu-form>

	var t = this
		, rc = RiotControl
		, s = stores

	t.formData = {
		query: {},
		submit: {
			name: 'Получить ключ',
			event: 'password_reset_request'
		},
		items: [
			{
				name: 'email',
				tag: 'input',
				title: 'Ваш email',
				type: 'email',
				required: 1
			}
		]
	}

	t.formPass = {
		query: {},
		submit: {
			name: 'Сменить пароль',
			event: 'password_reset'
		},
		items: [
			{
				name: 'resetToken',
				tag: 'textarea',
				title: 'Ключ для смены пароля',
				required: 1
			},{
				name: 'password',
				tag: 'input',
				title: 'Новый пароль',
				type: 'password',
				required: 1
			},{
				name: 'confirmPassword',
				tag: 'input',
				title: 'Повторите пароль',
				type: 'password',
				required: 1
			}
		],
		compare: ['password', 'confirmPassword'],
	}

	t.on('mount', function() {
		rc.trigger('set_title','Смена пароля')
		tags.add(t)
	});

</auth-reset>