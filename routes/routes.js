const ChatController = require('../app/controllers/ChatController')

module.exports = (app) => 
{
	app.get('/', ChatController.index)
	app.get('/login', ChatController.login)
	app.post('/login', ChatController.loginRequest)
	app.get('/logout', ChatController.logout);

	// Auth
	/*
	app.get('/login', ChatController.login)
	app.get('/register', ChatController.register)
	app.post('/register', ChatController.registerRequest)
	*/

	// Chat
	/*
	app.get('/chat', ChatController.chat);
	app.post('/chat/send', ChatController.sendChatMessage);
	*/
}