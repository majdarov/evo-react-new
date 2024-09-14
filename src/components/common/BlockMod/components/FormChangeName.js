"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.FormChangeName = void 0;
var react_1 = __importDefault(require("react"));
var BlockMod_module_css_1 = __importDefault(require("../BlockMod.module.css"));
function FormChangeName(props) {
    var value = props.value, label = props.label, nameOfAttr = props.nameOfAttr, onChange = props.onChange, handleClick = props.handleClick;
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("div", { "data-name": 'form-change-name', className: BlockMod_module_css_1["default"]['form-change-name'] },
            !!nameOfAttr && react_1["default"].createElement("h3", null,
                "\u0410\u0442\u0442\u0440\u0438\u0431\u0443\u0442: ",
                nameOfAttr),
            react_1["default"].createElement("label", { htmlFor: 'input-name' }, label),
            react_1["default"].createElement("input", { type: "text", name: 'input-name', value: value, onChange: onChange, autoFocus: true }),
            react_1["default"].createElement("i", { className: 'fa fa-plus', onClick: handleClick }))));
}
exports.FormChangeName = FormChangeName;
//# sourceMappingURL=FormChangeName.js.map