"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.CardSell = void 0;
var react_1 = __importDefault(require("react"));
var CardSell_module_css_1 = __importDefault(require("./CardSell.module.css"));
function CardSell(props) {
    var _a, _b;
    return (react_1["default"].createElement("div", { className: CardSell_module_css_1["default"]['card-container'] },
        react_1["default"].createElement("div", { className: CardSell_module_css_1["default"]['card-header'] },
            react_1["default"].createElement("h3", null,
                props.type,
                ": ",
                props.number)),
        react_1["default"].createElement("div", { className: CardSell_module_css_1["default"]['card-body'] },
            react_1["default"].createElement("ul", null, ((_a = props.body) === null || _a === void 0 ? void 0 : _a.positions) && props.body.positions.map(function (p) {
                return (react_1["default"].createElement("li", { key: p.uuid, id: p.uuid },
                    react_1["default"].createElement("span", null, p.product_name),
                    " |",
                    react_1["default"].createElement("span", null, p.price),
                    " |",
                    react_1["default"].createElement("span", null, p.quantity),
                    " |",
                    react_1["default"].createElement("span", null, p.sum)));
            }))),
        react_1["default"].createElement("div", { className: CardSell_module_css_1["default"]['card-footer'] },
            "Sum: ", (_b = props.body) === null || _b === void 0 ? void 0 :
            _b.result_sum)));
}
exports.CardSell = CardSell;
//# sourceMappingURL=CardSell.js.map