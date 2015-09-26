<auth-new>
	<itu-form data={ formData }>
		<div class="tar">
			<a href="#/auth/login">У меня уже есть аккаунт</a>
		</div>
	</itu-form>

	var t = this
		, rc = RiotControl
		, s = stores

	t.formData = {
		query: {},
		submit: {
			name: 'Зарегистрироваться',
			event: 'try_register'
		},
		items: [
			{
				name: 'first_name',
				tag: 'input',
				title: 'Имя',
				type: 'text',
				required: 1
			},{
				name: 'last_name',
				tag: 'input',
				title: 'Фамилия',
				type: 'text',
				required: 1
			},{
				name: 'email',
				tag: 'input',
				title: 'Email',
				type: 'email',
				required: 1
			},{
				name: 'password',
				tag: 'input',
				title: 'Пароль',
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
		rc.trigger('set_title','Регистрация')
		tags.add(t)
	});

</auth-new>