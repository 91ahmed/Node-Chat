const mongo = require('mongodb')

class Mongo 
{
	constructor ()
	{
		this.mongoClient    = mongo.MongoClient;
		this.connectUrl     = 'mongodb://localhost:27017';
		this.databaseName   = null;
		this.collectionName = null;
	}

	database (databaseName)
	{
		this.databaseName = databaseName;
		return this;
	}

	collection (collectionName)
	{
		this.collectionName = collectionName;
		return this;
	}

	collectionCreate ()
	{
		var self = this;

		this.mongoClient.connect(this.connectUrl, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, db){
			if (err) throw err;
			var dbo = db.db(self.databaseName);
			dbo.createCollection(self.collectionName);
		});

		return this;
	}

	collectionDrop () 
	{
		var self = this;

		this.mongoClient.connect(this.connectUrl, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, db){
			if (err) throw err;
			var dbo = db.db(self.databaseName);
			dbo.collection(self.collectionName).drop(function(err, done) {
			    if (err) throw err;
			});
		});

		return this;
	}

	insertOneData (data)
	{
		var self = this;

		this.mongoClient.connect(this.connectUrl, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, db){
			if (err) throw err;
			var dbo = db.db(self.databaseName);
			dbo.collection(self.collectionName).insertOne(data, function(err, res) {
			    if (err) throw err;
			});
		});

		return this;
	}

	insertManyData (data)
	{
		var self = this;

		this.mongoClient.connect(this.connectUrl, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, db){
			if (err) throw err;
			var dbo = db.db(self.databaseName);
			dbo.collection(self.collectionName).insertMany(data, function(err, res) {
			    if (err) throw err;
			});
		});

		return this;
	}

	findOneData ()
	{
		var self = this;

		this.mongoClient.connect(this.connectUrl, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, db){
			if (err) throw err;
			var dbo = db.db(self.databaseName);
			dbo.collection(self.collectionName).findOne({}, function(err, result) {
			    if (err) throw err;
			    console.log(result);
			});
		});

		return this;
	}

	findAllData ()
	{
		var self = this;

		this.mongoClient.connect(this.connectUrl, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, db){
			if (err) throw err;
			var dbo = db.db(self.databaseName);
			dbo.collection(self.collectionName).find({}).toArray(function(err, result) {
			    if (err) throw err;
			    console.log(result);
			});
		});

		return this;
	}

	findSomeFields (fields)
	{
		var self = this;

		this.mongoClient.connect(this.connectUrl, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, db){
			if (err) throw err;
			var dbo = db.db(self.databaseName);
			dbo.collection(self.collectionName).find({}, { projection: fields }).toArray(function(err, result) {
			    if (err) throw err;
			    console.log(result);
			});
		});

		return this;	
	}

}

module.exports = Mongo