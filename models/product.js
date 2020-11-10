const fs = require('fs');
const path = require('path');
const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class Product {
    constructor(title, price, description, imageUrl, _id, userId) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this._id = _id ? new mongodb.ObjectId(_id) : null;
        this.userId = userId ? new mongodb.ObjectId(userId) : null
    }

    save() {
        const db = getDb();
        let dbOp;
        if (this._id) {
            //Update the product
            dbOp = db
                .collection('products')
                .updateOne({_id: new mongodb.ObjectId(this.id)}, {$set: this});
        } else {
            dbOp = db
                .collection('products')
                .insertOne(this);
        }

        return dbOp
                 .then(result => {
                     console.log(result);
                 })
                 .catch(err => {
                     console.log(err);
                 });
    }

    static fetchAll() {
        const db = getDb();
        return db.collection('products')
                 .find()
                 .toArray()
                 .then(products => {
                     return products;
                 })
                 .catch(err => {
                     console.log(err);
                 });
    }

    static findById(prodId) {
        const db = getDb();
        return db.collection('products')
                 .find({_id: new mongodb.ObjectId(prodId)})
                 .next()
                 .then(product => {
                     return product;
                 })
                 .catch(err => {
                     console.log(err);
                 });
    }

    static deleteById(prodId) {
        const db = getDb();
        return db
            .collection('products')
            .deleteOne({ _id: new mongodb.ObjectId(prodId) })
            .then(result => {
                console.log('Deleted');
            })
            .catch(err => {
                console.log(err);
            });
    }

    static grabExtraJSONData(callback) {
        console.log(__dirname);
        // const fileContents = fs.readFile(__dirname)
        fs.readFile(path.join(__dirname, 'products.json'), callback);
    }
};

module.exports = Product;
