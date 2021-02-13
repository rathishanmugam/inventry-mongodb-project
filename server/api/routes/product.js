const Product = require('../../models/product')
const mongoose = require('mongoose')

// Get  all product document... from database
module.exports = function (router) {
    // router.get('/product', function (req, res) {
    //     Product.find().exec()
    //         .then(docs => res.status(200)
    //             .json(docs))
    //         .catch(err => res.status(500)
    //             .json({
    //                 message: 'Error finding user',
    //                 error: err
    //             }))
    // })

    // get specific product from database
    router.get('/product/:id', function (req, res) {
        console.log("product id|:" + req.params.id)
        Product.findById(req.params.id).exec()
            .then(docs => res.status(200)
                .json(docs))
            .catch(err => res.status(500)
                .json({
                    message: 'Error finding user',
                    error: err
                }))
    })

    // Get product balance for a specific user...
    router.get('/product', function (req, res) {
          const name = req.get('productId')
         // const year = req.params.productName
        // const userId = req.get('userId')
        const pipeline = [
            {
                $match: {
                    productId:name
                }
            },
                { $project: { productName: 1, productModel: 1,productOffer: 1,
                        cost: 1,stock: 1,sold: 1,
                        balance: { $subtract: [ "$stock", "$sold" ] } } }
            ]
console.log('pipeline query:',pipeline),
        Product.aggregate(pipeline). sort({ 'productName': 1 }).exec()
            .then(docs => res.status(200)
                .json(docs))
            .catch(err => res.status(500)

            .json({
                    message: 'Error finding product balance',
                    error: err
                }))
    })


    // Create new product document...
    router.post('/product', function (req, res) {
        console.log(req.body)
        let product = new Product(req.body)
        product.save(function (err, product) {
            if (err) return console.log(err)
            res.status(200).json(product)
        })
    })

    // Update product document...
    router.put('/product/:id', function (req, res) {
        console.log(req.body)
        let qry = {_id: req.params.id}
        let doc = {
            productName: req.body.productName,
            productModel: req.body.productModel,
            productOffer: req.body.productOffer,
            cost: req.body.cost,
            stock: req.body.stock,
            sold: req.body.sold,
            balance: req.body.balance
        }
        console.log('the updating record is :', doc)
        Product.updateOne(qry, doc, function (err, respRaw) {
            if (err) return console.log(err)
            res.status(200).json(respRaw)
        })
    })

    // delete product from database
    router.delete('/product/:id', function (req, res) {
        console.log(req.body)
        let qry = {_id: req.params.id}
        Product.remove(qry, function (err, respRaw) {
            if (err) return console.log(err)
            res.status(200).json(respRaw)
        })
    })
}
