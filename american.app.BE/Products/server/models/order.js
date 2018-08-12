'use strict';
const _ = require('underscore');
const config = require('../config.local');
const stripe = require('stripe')(config.stripe_secret_key);
const paypal = require('paypal-rest-sdk');
paypal.configure({
    'mode': config.paypal_mode,
    'client_id': config.paypal_client_id,
    'client_secret': config.paypal_client_secret
});
const async = require('async');
const shipmentStatus = require('../../../common/enums/common').shipmentStatus;

module.exports = function (Order) {
    // {"where": {"id": ""}, "include":[{"shipments" : ["seller", {"items":["product"]},"status"]},"status"]}


    /**
     * placeOrder 
     * @param {object} orderData full order object including shipments and shipmentItems
     * @param {*} next Callback function
     */
    Order.placeOrder = function (orderData, next) {

        // Create Order
        let orderObj = _.pick(orderData, 'ownerId', 'statusId', 'paymentInfo', 'shippingInfo', 'isPrototype');
        orderObj.orderNo = new Date().getTime();
        // Set status Pending
        orderObj.statusId = shipmentStatus.pending;
        Order.create(orderObj, function (err, orderInstance) {

            // Create Order Shipments
            async.times(orderData.shipments.length, function (i, shipmentNext) {
                let shipment = orderData.shipments[i];
                shipment.orderId = orderInstance.id;
                // Set status Pending
                shipment.statusId = shipmentStatus.pending;
                orderInstance.shipments.create(shipment, function (err, shipmentInstance) {

                    // Create Shipment Items
                    async.times(shipment.items.length, function (j, itemsNext) {
                        let item = shipment.items[j];
                        Order.app.models.product.find({ where: { _id: item.productId }, include: ['account'] },
                            function (error, product) {
                                var accountDataId = product[0].__data.account.__data.accountDataId.toString();
                                var model = {
                                    accountDataId: product[0].__data.account.__data.accountDataId.toString(),
                                    customerId: orderInstance.ownerId
                                }

                                Order.app.models.accountData.addCustomer(model, function (err, result) {
                                    shipmentInstance.items.create(item, itemsNext);
                                });
                            });
                    }, function (err, shipmentItemsInstances) {
                        shipmentNext(err, shipmentInstance);
                    })
                });
            }, function (err, shipmentInstances) {
                if (orderData.paymentInfo.method === "card") {
                    stripeCharge(orderData.paymentInfo.token.id, orderData.paymentInfo.total, orderInstance.id.toString(), function (err, charge) {
                        next(err, orderInstance)
                    });
                } else {
                    paypalCharge(function (err, result) {
                        next(err, orderInstance)
                    });
                }
            });
        });
    }

    Order.remoteMethod('placeOrder', {
        description: 'Place an order (1. create order, 2. create shipmets, 3.create shipmentItems)',
        accepts: [
            {
                description: 'full order object including shipments and shipmentItems. { order data..., "shipments": [ { ..., "items": [] } ]  }',
                arg: 'orderData', type: 'any', required: true, http: { source: 'body' }
            }],
        returns: { arg: 'order', type: 'any' },
        http: { path: '/placeorder', verb: 'post' }
    });

    Order.updateModelAttributes = function (id, updateObj, next) {

        Order.findById(id, function (err, instance) {
            if (err)
                next(err)

            instance = Object.assign(instance, updateObj);
            instance.save().then(reqponse => {
                next(null, instance)
            })
        })
    }

    Order.remoteMethod('updateModelAttributes', {
        description: 'Updates specific attributes',
        accepts: [{ arg: 'id', type: 'string', required: true },
        { arg: 'orderData', type: 'any', required: true, http: { source: 'body' } }],
        returns: { arg: 'order', type: 'any' },
        http: { path: '/updatemodelattributes/:id', verb: 'post' }
    });



    function stripeCharge(stripeToken, amount, orderId, cb) {
        stripe.charges.create({
            amount: amount,
            currency: 'usd',
            description: orderId,
            source: stripeToken,
        }, function (err, charge) {

            stripe.payouts.create({
                amount: amount,
                currency: 'usd',

            }, function (err, payout) {
                cb(err, charge);

            });
        });
    }

    function paypalCharge() {
        paypal.payment.create({})
    }
};
