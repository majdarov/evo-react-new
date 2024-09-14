"use strict";
exports.__esModule = true;
exports.getAttrChoice = exports.deleteFromArray = void 0;
// import { MouseEvent } from 'react';
var utillites_1 = require("../utillites");
var deleteFromArray = function (id, arr) {
    var i = arr.findIndex(function (item) { return item.id === id; });
    arr.splice(i, 1);
};
exports.deleteFromArray = deleteFromArray;
function getAttrChoice(name) {
    if (!name)
        return;
    return { id: utillites_1.getUUID4(), name: name };
}
exports.getAttrChoice = getAttrChoice;
//# sourceMappingURL=utilites.js.map