const config 	 = require('../../config')
const mysql      = require('mysql')

const { Client } = require('pg')

class Connect 
{
	mysqlConnect (connection = '')
	{
		var mysqlConnect = mysql.createConnection({
			'host': config.mysql_host,
			'user': config.mysql_user,
			'password': config.mysql_password,
			'database': config.mysql_database,
			'port': config.mysql_port,
		});

		return mysqlConnect;
	}

	postgresConnect (connection = '')
	{
		var postgresConnect = new Client({
			user: config.pg_user,
			host: config.pg_host,
			database: config.pg_database,
			password: config.pg_password,
			port: config.pg_port,
			ssl: false,
		});
		postgresConnect.connect();

		return postgresConnect;
	}
}

module.exports = Connect