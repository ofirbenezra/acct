/**
 * Created by BenEzra on 9/22/2017.
 */
var utils = {
    convertDateToTicks: function (date) {
        return ((date.getTime() * 10000) + 621355968000000000);
    },
    convertTicksToDate: function (pTicks) {
        var dateTimeObject;
        dateTimeObject = new Date((pTicks - 621355968000000000) / 10000);
        return dateTimeObject;
    }

}
module.exports = utils;