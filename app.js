const path    = require('path');
const express = require('express');
const app     = express();
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const port    = process.env.PORT || 3000;
const server  = require('http').createServer(app);
const io      = require('socket.io')(server);
const cookieParser = require('cookie-parser');

io.on('connection', (socket) => {
	socket.on('chat-message', data => {
		socket.broadcast.emit('send-data', data);
	});
});

const routes  = require('./routes/routes');

//
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(express.static('public'));

// Cookies
app.use(cookieParser())

// Sessions
app.use(session({
	store: new FileStore({
		path: './storage/sessions',
		logFn: function(){}
	}),
	secret: 'A4fr4gGJvvvBX',
	resave: true,
	saveUninitialized: true,
	cookie: { 
		secure: false // Note that secure: true is a recommended option. it requires an https-enabled website. 
	}
}));

// Set views path
app.set('views', path.join(__dirname, 'app/views'));

// Set Template engine
app.set('view engine', 'pug');

routes(app);

/** Run Server **/
server.listen(port, () => {
	console.log('Server is running.. | Port: '+port)
});