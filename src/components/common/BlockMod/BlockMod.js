"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.BlockMod = void 0;
var react_1 = __importDefault(require("react"));
var Modal_1 = require("../Modal/Modal");
var BlockMod_module_css_1 = __importDefault(require("./BlockMod.module.css"));
var AddElement_1 = require("./components/AddElement");
var FormChangeName_1 = require("./components/FormChangeName");
var LiElement_1 = require("./components/LiElement");
var useAttributes_1 = require("./Hooks/useAttributes");
function BlockMod(props) {
    var attributes = props.attributes, setAttributes = props.setAttributes, disabled = props.disabled;
    var _a = useAttributes_1.useAttributes(attributes, setAttributes), onBlocModClick = _a.onBlocModClick, handleClick = _a.handleClick, changeParamName = _a.changeParamName, nameOfAttr = _a.nameOfAttr, paramName = _a.paramName, action = _a.action, inputHidden = _a.inputHidden;
    return (react_1["default"].createElement("div", { className: BlockMod_module_css_1["default"]['attributes'], onClick: onBlocModClick },
        !inputHidden &&
            react_1["default"].createElement(Modal_1.Modal, null,
                react_1["default"].createElement(FormChangeName_1.FormChangeName, { nameOfAttr: nameOfAttr || '', label: action.split('-')[1] === 'attr' ? 'Аттрибут' : 'Значение', value: paramName, onChange: changeParamName, handleClick: handleClick })),
        react_1["default"].createElement("ul", { className: BlockMod_module_css_1["default"]['attributes-ul'] },
            !!attributes.length &&
                attributes.map(function (attr, idx) {
                    return react_1["default"].createElement(LiElement_1.LiElement, { key: attr.id, typeLi: 'attr', inputHidden: inputHidden, id: attr.id, name: attr.name, className: BlockMod_module_css_1["default"]['attribut'], disabled: disabled, children: attr.choices });
                }),
            (!disabled && inputHidden) &&
                react_1["default"].createElement(AddElement_1.AddElement, { key: 'add-attr', action: 'add', typeElem: 'attr', label: '\u0410\u0442\u0442\u0440\u0438\u0431\u0443\u0442' }))));
}
exports.BlockMod = BlockMod;
//# sourceMappingURL=BlockMod.js.map