'use strict';
const _ = require('underscore');
const async = require('async');

module.exports = function (Order) {
    // {"where": {"id": ""}, "include":[{"shipments" : ["seller", {"items":["product"]},"status"]},"status"]}


    /**
     * placeOrder 
     * @param {object} orderData full order object including shipments and shipmentItems
     * @param {*} next Callback function
     */
    Order.placeOrder = function (orderData, next) {

        // Create Order
        let orderObj = _.pick(orderData, 'ownerId', 'statusId', 'paymentInfo');
        orderObj.orderNo = new Date().getTime();
        Order.create(orderObj, function (err, orderInstance) {

            // Create Order Shipments
            async.times(orderData.shipments.length, function (i, shipmentNext) {
                let shipment = orderData.shipments[i];
                shipment.orderId = orderInstance.id;

                orderInstance.shipments.create(shipment, function (err, shipmentInstance) {

                    // Create Shipment Items
                    async.times(shipment.items.length, function (j, itemsNext) {
                        let item = shipment.items[j];
                        shipmentInstance.items.create(item, itemsNext);

                    }, function (err, shipmentItemsInstances) {
                        shipmentNext(err, shipmentInstance);
                    })
                });
            }, function (err, shipmentInstances) {
                next(err, shipmentInstances)
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
        returns: { arg: 'done', type: 'any' },
        http: { path: '/placeorder', verb: 'post' }
    });

};
