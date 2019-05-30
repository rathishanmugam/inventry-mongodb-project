const Product = require('../../models/purchase')
const mongoose = require('mongoose')

// Get all purchase from database
module.exports = function (router) {
    router.get('/purchase', function (req, res) {
        Product.find().exec()
            .then(docs => res.status(200)
                .json(docs))
            .catch(err => res.status(500)
                .json({
                    message: 'Error finding user',
                    error: err
                }))
    })

    // get specific purchase from database
    router.get('/purchase/:id', function (req, res) {
        Product.findById(req.params.id).exec()
            .then(docs => res.status(200)
                .json(docs))
            .catch(err => res.status(500)
                .json({
                    message: 'Error finding user',
                    error: err
                }))
    })
    // Create new purchase document...
    router.post('/purchase', function (req, res) {
        let transaction = new Product(req.body)
        transaction.save(function (err, transaction) {
            if (err) return console.log(err)
            res.status(200).json(transaction)
        })
    })
    // Update purchase document...
    router.put('/purchase/:id', function (req, res) {
        console.log(req.body)
        let qry = { _id: req.params.id }
        let doc = {
            productId: req.body.productId,
            customerName: req.body.customerName,
            purchaseItem: req.body.purchaseItem,
            quantity: req.body.quantity,
            rate: req.body.rate,
            offer: req.body.offer,
            paymentType: req.body.paymentType,
            paid: req.body.paid,
            purchaseDate: req.body.purchaseDate
        }
        console.log('the updating record is :' , doc)
        Product.update(qry, doc, function (err, respRaw) {
            if (err) return console.log(err)
            res.status(200).json(respRaw)
        })
    })

    // delete purchase from database
    router.delete('/purchase/:id', function (req, res) {
        console.log(req.body)
        let qry = { _id: req.params.id }
        Product.delete(qry, doc, function (err, respRaw) {
            if (err) return console.log(err)
            res.status(200).json(respRaw)
        })
    })
}
