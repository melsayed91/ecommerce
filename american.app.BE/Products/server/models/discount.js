'use strict';
var moment = require('moment');
module.exports = function (discount) {

    function validate_start_date(err) {
        var now_date = moment().startOf('day');
        var start_date = moment(this.start_date).startOf('day');
        if (!start_date.isSameOrAfter(now_date)) {
            err();
        }
    }
    function validate_end_date(err) {
        var start_date = moment(this.start_date).startOf('day');
        var end_date = moment(this.end_date).startOf('day');
        if (!end_date.isSameOrAfter(start_date)) {
            err();
        }
    }

    discount.validate('end_date', validate_end_date, { message: 'End date must be greater than or equal to Start Date' })

    discount.validate('start_date', validate_start_date, { message: 'Start date must be greater than or equal to today' })
};
