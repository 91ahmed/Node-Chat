const Model = require('./model')
const url   = require('url')

class Mysql extends Model
{
	delete (condition)
	{
		this.sqlQuery = 'DELETE FROM '+this.table+' WHERE ?';
		
		this.mysqlConnect().query(this.sqlQuery, [condition]);
	}

	insert (data)
	{
		this.sqlQuery = 'INSERT INTO '+this.table+' SET ?';

		this.mysqlConnect().query(this.sqlQuery, [data]);
	}

	update (data, condition)
	{
		this.sqlQuery = 'UPDATE '+this.table+' SET ? WHERE ?';
		
		this.mysqlConnect().query(this.sqlQuery, [data, condition]);
	}

	get (callback)
	{
		this.mysqlConnect().query(this.sqlQuery, function (err, result) {
			if (err) throw err;
			callback(result);
		});
	}

	paginate (request, rows)
	{
		var urlParams = url.parse(request.url, true).query;
		var urlPage   = '1';

		if (typeof urlParams.page !== "undefined") {
			urlPage = urlParams.page;
		}

		var start = (urlPage - 1) * rows;
		var end   = rows;

		this.sqlQuery += ' LIMIT '+start+', '+end+'';

		this.mysqlConnect().query(this.sqlQuery, function (err, result) {
			if (err) throw err;
			return result;
		});
	}
}

module.exports = Mysql