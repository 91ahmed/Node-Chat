const Model = require('./model')
const url   = require('url')

class PostgreSql extends Model
{
	delete (condition)
	{
		this.sqlQuery = 'DELETE FROM '+this.table+' WHERE ';

		for (const [column, value] of Object.entries(condition)) {
			this.sqlQuery += ""+column+"='"+value+"', ";
		}

		this.sqlQuery = this.sqlQuery.substring(0,this.sqlQuery.length - 2); // Remove last 2 characters
		
		this.postgresConnect().query(this.sqlQuery);
	}

	insert (data)
	{
		this.sqlQuery = 'INSERT INTO '+this.table+' (';

		for (const [column, value] of Object.entries(data)) {
			this.sqlQuery += column+',';
		}

		this.sqlQuery = this.sqlQuery.substring(0,this.sqlQuery.length - 1); // Remove last character
		this.sqlQuery += ') VALUES (';

		for (const [column, value] of Object.entries(data)) {
			this.sqlQuery += "'"+value+"',";
		}

		this.sqlQuery = this.sqlQuery.substring(0,this.sqlQuery.length - 1); // Remove last character
		this.sqlQuery += ')';

		this.postgresConnect().query(this.sqlQuery);
	}

	update (data, condition)
	{
		this.sqlQuery = 'UPDATE '+this.table+' SET ';
		
		for (const [column, value] of Object.entries(data)) {
			this.sqlQuery += column+"='"+value+"', ";
		}

		this.sqlQuery = this.sqlQuery.substring(0,this.sqlQuery.length - 2); // Remove last 2 characters

		for (const [column, value] of Object.entries(condition)) {
			this.sqlQuery += " WHERE "+column+"='"+value+"', ";
		}

		this.sqlQuery = this.sqlQuery.substring(0,this.sqlQuery.length - 2); // Remove last 2 characters

		this.postgresConnect().query(this.sqlQuery);
	}

	get (callback)
	{
		this.postgresConnect().query(this.sqlQuery, function (err, result) {
			if (err) throw err;
			callback(result.rows);
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

		this.sqlQuery += ' LIMIT '+rows+' offset '+start+'';

		this.postgresConnect().query(this.sqlQuery, function (err, result) {
			if (err) throw err;
			return result.rows;
		});
	}
}

module.exports = PostgreSql