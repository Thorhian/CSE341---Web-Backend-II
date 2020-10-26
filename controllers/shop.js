const Product = require('../models/product');
const User = require('../models/user');

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
           .then(products => {
               res.render('pages/shop/product-list', {
                   prods: products,
                   pageTitle: 'All Products',
                   path: '/products'
               });
           })
           .catch(err => {
               console.log(err)
           });
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
           .then(product => {
               res.render('pages/shop/product-detail', {
                   product: product,
                   pageTitle: product.title,
                   path: '/products'
               });
           })
           .catch(err => {
               console.log(err);
           });
};

exports.getIndex = (req, res, next) => {
    Product.fetchAll()
           .then(products => {
               res.render('pages/shop/index', {
                   prods: products,
                   pageTitle: 'Shop',
                   path: '/'
               });
           })
           .catch(err => {
               console.log(err);
           });
};

exports.getCart = (req, res, next) => {
    req.session.user
       .getCart()
       .then(products => {
           res.render('pages/shop/cart', {
               path: '/cart',
               pageTitle: 'Your Cart',
               products: products

           });
       })
       .catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    if (prodId) {
        console.log('Product ID exists in the req body.');
    } else {
        console.log('Getting a null productID');
    }
    console.log(req.session.user);
    Product.findById(prodId)
           .then(product => {
               const user = req.session.user;
               user.addToCart(product);
           })
           .then(result => {
               console.log(result);
               res.redirect('/shop/cart');
           })
           .catch(err => {
               console.log(err);
           })
};

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    req.user
       .deleteItemFromCart(prodId)
       .then(result => {
           res.redirect('/shop/cart');
       })
       .catch(err => console.log(err));
};

exports.postOrder = (req, res, next) => {
    let fetchedCart;
    req.user
       .addOrder()
       .then(result => {
           res.redirect('/orders');
       })
       .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
    req.user
       .getOrders()
       .then(orders => {
           res.render('shop/orders', {
               path: '/orders',
               pageTitle: 'Your Orders',
               orders: orders
           });
       })
       .catch(err => console.log(err));
};

exports.getCheckout = (req, res, next) => {
    res.render('pages/shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'
    });
};
