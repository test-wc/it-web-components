"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItTabs = void 0;
var lit_1 = require("lit");
var decorators_js_1 = require("lit/decorators.js");
var ItTabs = function () {
    var _classDecorators = [(0, decorators_js_1.customElement)('it-tabs')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _classSuper = lit_1.LitElement;
    var _header_decorators;
    var _header_initializers = [];
    var _header_extraInitializers = [];
    var _counter_decorators;
    var _counter_initializers = [];
    var _counter_extraInitializers = [];
    var ItTabs = _classThis = /** @class */ (function (_super) {
        __extends(ItTabs_1, _super);
        function ItTabs_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.header = __runInitializers(_this, _header_initializers, 'Hey there');
            _this.counter = (__runInitializers(_this, _header_extraInitializers), __runInitializers(_this, _counter_initializers, 5));
            __runInitializers(_this, _counter_extraInitializers);
            return _this;
        }
        ItTabs_1.prototype.__increment = function () {
            this.counter += 1;
        };
        ItTabs_1.prototype.render = function () {
            return (0, lit_1.html)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      <h2>", " Nr. ", "!</h2>\n      <button @click=", ">\n        <slot name=\"content\">increment</slot>\n      </button>\n    "], ["\n      <h2>", " Nr. ", "!</h2>\n      <button @click=", ">\n        <slot name=\"content\">increment</slot>\n      </button>\n    "])), this.header, this.counter, this.__increment);
        };
        return ItTabs_1;
    }(_classSuper));
    __setFunctionName(_classThis, "ItTabs");
    (function () {
        var _a;
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _header_decorators = [(0, decorators_js_1.property)({ type: String })];
        _counter_decorators = [(0, decorators_js_1.property)({ type: Number })];
        __esDecorate(null, null, _header_decorators, { kind: "field", name: "header", static: false, private: false, access: { has: function (obj) { return "header" in obj; }, get: function (obj) { return obj.header; }, set: function (obj, value) { obj.header = value; } }, metadata: _metadata }, _header_initializers, _header_extraInitializers);
        __esDecorate(null, null, _counter_decorators, { kind: "field", name: "counter", static: false, private: false, access: { has: function (obj) { return "counter" in obj; }, get: function (obj) { return obj.counter; }, set: function (obj, value) { obj.counter = value; } }, metadata: _metadata }, _counter_initializers, _counter_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ItTabs = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.styles = (0, lit_1.css)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    :host {\n      display: block;\n      padding: 25px;\n      color: var(--it-tabs-text-color, #000);\n    }\n  "], ["\n    :host {\n      display: block;\n      padding: 25px;\n      color: var(--it-tabs-text-color, #000);\n    }\n  "])));
    (function () {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ItTabs = _classThis;
}();
exports.ItTabs = ItTabs;
var templateObject_1, templateObject_2;
