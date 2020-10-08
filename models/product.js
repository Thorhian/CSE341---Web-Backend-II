const fs = require('fs');
const path = require('path');

const Cart = require('./cart');


const p = path.join(__dirname, 'products.json');

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

const mongodb = require('mongodb');
const getDB = require('../util/database').getDB;

class Product {
    constructor(title, price, description, imageUrl, _id) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this._id = _id;
    }

    save() {
        const db = getDB();
        let dbOp;
        if (this._id) {
            //Update the product
            dbOp = db.collection('products')
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
        const db = getDB();
        return db.collection('products')
                 .find()
                 .toArray()
                 .then(products => {
                     console.log(products);
                     return products;
                 })
                 .catch(err => {
                     console.log(err);
                 });
    }

    static findById(prodId) {
        const db = getDB();
        console.log(prodId);
        return db.collection('products')
                 .find({_id: new mongodb.ObjectId(prodId)})
                 .next()
                 .then(product => {
                     console.log(product);
                     return product;
                 })
                 .catch(err => {
                     console.log(err);
                 });
    }
};

module.exports = Product;

//Depracated
//module.exports = class Product {
    //constructor(id, title, imageUrl, description, price) {
        //this.id = id;
        //this.title = title;
        //this.imageUrl = imageUrl;
        //this.description = description;
        //this.price = price;
    //}
//
    //save() {
        //getProductsFromFile(products => {
            //if (this.id) {
                //const existingProductIndex = products.findIndex(
                    //prod => prod.id === this.id
                //);
                //const updatedProducts = [...products];
                //updatedProducts[existingProductIndex] = this;
                //fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                    //console.log(err);
                //});
            //} else {
                //this.id = Math.random().toString();
                //products.push(this);
                //fs.writeFile(p, JSON.stringify(products), err => {
                    //console.log(err);
                //});
            //}
        //});
    //}
    //static deleteById(id) {
        //getProductsFromFile(products => {
            //const product = products.find(prod => prod.id === id);
            //const updatedProducts = products.filter(prod => prod.id !== id);
            //fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                //if (!err) {
                    //Cart.deleteProduct(id, product.price);
                //}
            //});
        //});
    //}
//
    //static fetchAll(cb) {
        //getProductsFromFile(cb);
    //}
//
    //static findById(id, cb) {
        //getProductsFromFile(products => {
            //const product = products.find(p => p.id === id);
            //cb(product);
        //});
    //}
//}
