"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.LiElement = void 0;
var react_1 = __importDefault(require("react"));
var BlockMod_module_css_1 = __importDefault(require("../BlockMod.module.css"));
var AddElement_1 = require("./AddElement");
function LiElement(_a) {
    var id = _a.id, name = _a.name, className = _a.className, disabled = _a.disabled, children = _a.children, typeLi = _a.typeLi, inputHidden = _a.inputHidden;
    var createSubLi = function () {
        if (children === null || children === void 0 ? void 0 : children.length) {
            var map = children.map(function (item) {
                var choices, clsN;
                if (item.choices) {
                    choices = item.choices;
                    clsN = BlockMod_module_css_1["default"]['attribut'];
                }
                else {
                    choices = null;
                    clsN = BlockMod_module_css_1["default"]['choice'];
                }
                return (react_1["default"].createElement(LiElement, { key: item.id, id: item.id, name: item.name, children: choices, className: clsN, disabled: disabled, typeLi: typeLi === 'attr' ? 'choice' : 'attr', inputHidden: inputHidden }));
            });
            return map;
        }
        return;
    };
    return (react_1["default"].createElement("li", { id: id, "data-name": name, className: className },
        react_1["default"].createElement("label", null, name),
        !disabled && react_1["default"].createElement("i", { "data-action": "edit-" + typeLi, className: 'fa fa-edit' }),
        react_1["default"].createElement("ul", { className: BlockMod_module_css_1["default"]['choices-ul'] },
            createSubLi(),
            typeLi === 'attr' && !disabled && inputHidden &&
                react_1["default"].createElement(AddElement_1.AddElement, { key: 'add-choice', action: 'add', typeElem: 'choice', label: '\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435' }))));
}
exports.LiElement = LiElement;
//# sourceMappingURL=LiElement.js.map