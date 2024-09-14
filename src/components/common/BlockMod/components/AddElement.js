"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.AddElement = void 0;
var react_1 = __importDefault(require("react"));
function AddElement(props) {
    var action = props.action, typeElem = props.typeElem, label = props.label;
    return (react_1["default"].createElement("div", { style: { cursor: 'pointer' } },
        react_1["default"].createElement("strong", { "data-action": action + "-" + typeElem },
            "+ ",
            label)));
}
exports.AddElement = AddElement;
//# sourceMappingURL=AddElement.js.map