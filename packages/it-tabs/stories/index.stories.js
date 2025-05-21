"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlottedContent = exports.CustomCounter = exports.CustomHeader = exports.Regular = void 0;
var lit_1 = require("lit");
require("../src/it-tabs.js");
exports.default = {
    title: 'ItTabs',
    component: 'it-tabs',
    argTypes: {
        header: { control: 'text' },
        counter: { control: 'number' },
        textColor: { control: 'color' },
    },
};
var Template = function (_a) {
    var _b = _a.header, header = _b === void 0 ? 'Hello world' : _b, _c = _a.counter, counter = _c === void 0 ? 5 : _c, textColor = _a.textColor, slot = _a.slot;
    return (0, lit_1.html)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  <it-tabs\n    style=\"--it-tabs-text-color: ", "\"\n    .header=", "\n    .counter=", "\n  >\n    ", "\n  </it-tabs>\n"], ["\n  <it-tabs\n    style=\"--it-tabs-text-color: ", "\"\n    .header=", "\n    .counter=", "\n  >\n    ", "\n  </it-tabs>\n"])), textColor || 'black', header, counter, slot);
};
exports.Regular = Template.bind({});
exports.CustomHeader = Template.bind({});
exports.CustomHeader.args = {
    header: 'My header',
};
exports.CustomCounter = Template.bind({});
exports.CustomCounter.args = {
    counter: 123456,
};
exports.SlottedContent = Template.bind({});
exports.SlottedContent.args = {
    slot: (0, lit_1.html)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["<p>Slotted content</p>"], ["<p>Slotted content</p>"]))),
};
exports.SlottedContent.argTypes = {
    slot: { table: { disable: true } },
};
var templateObject_1, templateObject_2;
