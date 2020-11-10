const Product = require('../models/product');

exports.getMainPage = (req, res, next) => {
    res.render('pages/prove08', {
        title: "Gaben"
    });
}

exports.postGetJSON = (req, res, next) => {
    //const pageNumber = req.
    Product.grabExtraJSONData((err, data) => {
        if (err) {
            console.log(err);
            res.send(-1);
            res.end();
            return;
        }

        const productData = JSON.parse(data);
        console.log(productData);

        res.status(200).json(productData);
    });

}
