const customer = require('../../models/customer')
const mongoose = require('mongoose')

// Get all customer from database
module.exports = function (router) {
    router.get('/customer', function (req, res) {
        console.log("customer id|:" +customer)

        customer.find().exec()
            .then(docs => res.status(200)
                .json(docs))
            .catch(err => res.status(500)
                .json({
                    message: 'Error finding user',
                    error: err
                }))
    })

    // get specific customer from database
    router.get('/customer/:id', function (req, res) {
        console.log("Customer:"+customer)
        console.log(req.params.id)
        customer.findById(req.params.id).exec()
            .then(docs => res.status(200)
                .json(docs))
            .catch(err => res.status(500)
                .json({
                    message: 'Error finding user',
                    error: err
                }))
    })
    // get specific customer from database
    router.get('/customer/email/:email', function (req, res) {
        console.log("Customer:"+customer)
        console.log(req.params.email)
        customer.find({'email': req.params.email}).exec()
            .then(docs => {
                console.log(docs);
                return res.status(200)
                .json(docs)})
            .catch(err => res.status(500)
                .json({
                    message: 'Error finding user by email',
                    error: err
                }))
    })
    // Create new customer document...
    router.post('/customer', function (req, res) {
        let transaction = new customer(req.body)
        transaction.save(function (err, transaction) {
            if (err) return console.log(err)
            res.status(200).json(transaction)
        })
    })
    // Update customer document...
    router.put('/customer/:id', function (req, res) {
        console.log(req.body)
        let qry = {_id: req.params.id}
        let doc = {
            customerName: req.body.customerName,
            phoneNo: req.body.phoneNo,
            address: req.body.address,
            email: req.body.email
        }
        console.log('the updating record is :', doc)
        customer.update(qry, doc, function (err, respRaw) {
            if (err) return console.log(err)
            res.status(200).json(respRaw)
        })
    })

    // delete customer from database
    router.delete('/customer/:id', function (req, res) {
        console.log(req.body)
        let qry = {_id: req.params.id}
        customer.delete(qry, doc, function (err, respRaw) {
            if (err) return console.log(err)
            res.status(200).json(respRaw)
        })
    })
}
