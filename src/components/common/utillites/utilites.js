"use strict";
exports.__esModule = true;
exports.getMinData = exports.dateToString = exports.getUUID4 = exports.randomMax = void 0;
function randomMax(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
exports.randomMax = randomMax;
function getUUID4() {
    var arr = [];
    while (arr.length < 16) {
        var byte = randomMax(16).toString(16).concat(randomMax(16).toString(16));
        if (arr.length === 6)
            byte = ((parseInt('0x' + byte, 16) & 0x0f) | 0x40).toString(16);
        if (arr.length === 8)
            byte = ((parseInt('0x' + byte, 16) & 0x3f) | 0x80).toString(16);
        arr.push(byte);
    }
    var newStr = arr.join('');
    var strUuid = newStr.slice(0, 8);
    strUuid += '-' + newStr.slice(8, 12);
    strUuid += '-' + newStr.slice(12, 16);
    strUuid += '-' + newStr.slice(16, 20);
    strUuid += '-' + newStr.slice(20);
    return strUuid;
}
exports.getUUID4 = getUUID4;
function dateToString(date) {
    if (date === void 0) { date = new Date(); }
    if (!date)
        return;
    function dblDigit(dgt) {
        if (dgt.toString().length < 2) {
            return "0" + dgt;
        }
        else {
            return dgt;
        }
        ;
    }
    var strDate = date.getFullYear() + "-" + dblDigit(date.getMonth() + 1) + "-" + dblDigit(date.getDate());
    return strDate;
}
exports.dateToString = dateToString;
function getMinData() {
    var key = localStorage.getItem('storeKey');
    if (!key)
        return '';
    try {
        var min = key.split('-')[0];
        var year = min.slice(0, 4);
        var month = min.slice(4, 6);
        var day = min.slice(6);
        return year + "-" + month + "-" + day;
    }
    catch (e) {
        console.error(e.message);
    }
}
exports.getMinData = getMinData;
//# sourceMappingURL=utilites.js.map