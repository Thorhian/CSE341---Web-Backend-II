const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const cors = require('cors');

let _db;

const corsOptions = {
    origin: "https://secret-sierra-66724.heroku.com/",
    optionsSuccessStatus: 200
};

const MONGODB_URL = process.env.MONGODB_URL;

const mongoConnect = (callback) => {
    MongoClient.connect(MONGODB_URL)
               .then(client => {
                   console.log('Connected to MongoDB!');
                   _db = client.db();
                   callback();
               })
               .catch(err => {
                   console.log(err);
                   throw err;
               });
}

const getDB = () => {
    if (_db) {
        return _db;
    }
    throw 'No Database Found!';
}
exports.mongoConnect = mongoConnect;
exports.getDB = getDB;
