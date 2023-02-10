const Mysql      = require('../../lib/database/mysql')
const PostgreSql = require('../../lib/database/postgresql')
const Mongo      = require('../../lib/database/mongodb')
const Validator  = require('../../lib/validator/validator')
const helpers    = require('../../public/js/helpers')
const axios      = require('axios')

exports.index = (req, res) =>
{
	var title = 'Home';

	if(!req.session.logged) {
		res.redirect('/login');
	} else {
		res.render('chat/index', {title: title})
	}
		
	/*
	// Get 2 users
	new Mysql('users').all().limit(2).get((users22) => {
		// Get 3 users
		new PostgreSql('users').customQuery('SELECT * from users LIMIT 3').get((users3) => {
			// Render view
			res.render('app/index', {data2: users2, data3: users3, title: title})
		});
	});
	*/
}

exports.login = (req, res) => 
{
	if(req.session.logged) {
		res.redirect('/');
	} else {
		res.render('chat/login')
	}
}

exports.loginRequest = (req, res) => 
{
	var name   = req.body.name;
	var avatar = req.body.avatar;

	// Validation
	var valid = new Validator();
	valid.input(name, 'name').alpha().required();

	if (valid.isValid()) {
		if (name !== '' || avatar !== '') {
			res.cookie('id', helpers.randomChar(15))
			res.cookie('name', name)
			res.cookie('avatar', avatar)
			req.session.logged = 'logged'
			req.session.name = name
			req.session.avatar = avatar
			res.redirect('/')
		}
	} else {
		res.redirect('/login')
	}
}

exports.logout = (req, res) => 
{
	req.session.destroy();
	res.redirect('/login');
}

/*
exports.chat = (req, res) => 
{
	new PostgreSql('chat').all().get((chat) => {
		res.render('app/chat', {data: chat});
	});
}

exports.sendChatMessage = (req, res) => 
{
	var name    = Math.floor(Math.random() * 1000000000);
	var message = req.body.message;

	if (message !== '')
	{
		new PostgreSql('chat').insert({
			'name': name,
			'message': message,
			'thedate': '2020-12-09',
		});
	}
}

exports.login = (req, res) => 
{
	res.render('app/auth/login')
}

exports.register = (req, res) =>
{
	res.render('app/auth/register')
}

exports.registerRequest = (req, res) => 
{
	new PostgreSql().customQuery('SELECT MAX(id) AS maxid FROM users').get((userId) => 
	{
		var id = userId[0].maxid+1;
		var username = req.body.username;
		var email    = req.body.email;
		var password = req.body.password;
		var confirmPassword = req.body.confirmPassword;

		if (username == '' || email == '' || password == '') {
			res.status(500);
			res.send('there is an empty field');
		} else if (password !== confirmPassword){
			res.status(500);
			res.send('password confirmation doesn\'t match password');
		} else {
			new PostgreSql('users').insert({
				'id': id,
				'name': username,
				'email': email,
				'password': password
			});

			res.redirect('/');
		}

	});
}
*/