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
exports.ItButton = void 0;
var globals_1 = require("@it-web-components/globals");
var lit_1 = require("lit");
var decorators_js_1 = require("lit/decorators.js");
var if_defined_js_1 = require("lit/directives/if-defined.js");
var button_scss_inline_1 = require("./button.scss?inline");
var ItButton = function () {
    var _classDecorators = [(0, decorators_js_1.customElement)('it-button')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _classSuper = (0, globals_1.BaseComponent)(button_scss_inline_1.default);
    var __buttonClasses_decorators;
    var __buttonClasses_initializers = [];
    var __buttonClasses_extraInitializers = [];
    var _type_decorators;
    var _type_initializers = [];
    var _type_extraInitializers = [];
    var _variant_decorators;
    var _variant_initializers = [];
    var _variant_extraInitializers = [];
    var _outline_decorators;
    var _outline_initializers = [];
    var _outline_extraInitializers = [];
    var _disabled_decorators;
    var _disabled_initializers = [];
    var _disabled_extraInitializers = [];
    var _value_decorators;
    var _value_initializers = [];
    var _value_extraInitializers = [];
    var _internals_decorators;
    var _internals_initializers = [];
    var _internals_extraInitializers = [];
    var ItButton = _classThis = /** @class */ (function (_super) {
        __extends(ItButton_1, _super);
        function ItButton_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._buttonClasses = __runInitializers(_this, __buttonClasses_initializers, '');
            _this.type = (__runInitializers(_this, __buttonClasses_extraInitializers), __runInitializers(_this, _type_initializers, 'button'));
            _this.variant = (__runInitializers(_this, _type_extraInitializers), __runInitializers(_this, _variant_initializers, ''));
            _this.outline = (__runInitializers(_this, _variant_extraInitializers), __runInitializers(_this, _outline_initializers, false));
            _this.disabled = (__runInitializers(_this, _outline_extraInitializers), __runInitializers(_this, _disabled_initializers, false));
            _this.value = (__runInitializers(_this, _disabled_extraInitializers), __runInitializers(_this, _value_initializers, ''));
            _this.internals = (__runInitializers(_this, _value_extraInitializers), __runInitializers(_this, _internals_initializers, _this.attachInternals()));
            __runInitializers(_this, _internals_extraInitializers);
            return _this;
        }
        Object.defineProperty(ItButton_1, "formAssociated", {
            get: function () {
                return true;
            },
            enumerable: false,
            configurable: true
        });
        ItButton_1.prototype.firstUpdated = function (_changedProperties) {
            var button = this.renderRoot.querySelector('button');
            if (button) {
                this.addFocus(button);
            }
        };
        ItButton_1.prototype.updated = function () {
            this._buttonClasses = this.composeClass('btn', this.outline ? '' : this.variant !== '' ? "btn-".concat(this.variant) : '', this.outline
                ? "".concat(this.outline ? 'btn-outline-' : '').concat(this.variant)
                : '', this.disabled ? 'disabled' : '');
        };
        ItButton_1.prototype.surfaceSubmitEvent = function (event) {
            if (this.form) {
                event.preventDefault();
                event.stopPropagation();
                this.form.requestSubmit();
            }
        };
        Object.defineProperty(ItButton_1.prototype, "form", {
            get: function () {
                return this.internals ? this.internals.form : null;
            },
            enumerable: false,
            configurable: true
        });
        // Render the UI as a function of component state
        ItButton_1.prototype.render = function () {
            return (0, lit_1.html)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      <button\n        type=\"", "\"\n        disabled=", "\n        class=\"", "\"\n        @click=\"", "\"\n        .value=\"", "\"\n      >\n        <slot></slot>\n      </button>\n    "], ["\n      <button\n        type=\"", "\"\n        disabled=", "\n        class=\"", "\"\n        @click=\"", "\"\n        .value=\"", "\"\n      >\n        <slot></slot>\n      </button>\n    "])), this.type, (0, if_defined_js_1.ifDefined)(this.disabled || undefined), this._buttonClasses, this.type === 'submit' ? this.surfaceSubmitEvent : undefined, (0, if_defined_js_1.ifDefined)(this.value ? this.value : undefined));
        };
        return ItButton_1;
    }(_classSuper));
    __setFunctionName(_classThis, "ItButton");
    (function () {
        var _a;
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __buttonClasses_decorators = [(0, decorators_js_1.property)({ type: String })];
        _type_decorators = [(0, decorators_js_1.property)({ type: String })];
        _variant_decorators = [(0, decorators_js_1.property)({ type: String })];
        _outline_decorators = [(0, decorators_js_1.property)({ type: Boolean })];
        _disabled_decorators = [(0, decorators_js_1.property)({ type: Boolean })];
        _value_decorators = [(0, decorators_js_1.property)({ type: String })];
        _internals_decorators = [(0, decorators_js_1.property)({ type: ElementInternals })];
        __esDecorate(null, null, __buttonClasses_decorators, { kind: "field", name: "_buttonClasses", static: false, private: false, access: { has: function (obj) { return "_buttonClasses" in obj; }, get: function (obj) { return obj._buttonClasses; }, set: function (obj, value) { obj._buttonClasses = value; } }, metadata: _metadata }, __buttonClasses_initializers, __buttonClasses_extraInitializers);
        __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
        __esDecorate(null, null, _variant_decorators, { kind: "field", name: "variant", static: false, private: false, access: { has: function (obj) { return "variant" in obj; }, get: function (obj) { return obj.variant; }, set: function (obj, value) { obj.variant = value; } }, metadata: _metadata }, _variant_initializers, _variant_extraInitializers);
        __esDecorate(null, null, _outline_decorators, { kind: "field", name: "outline", static: false, private: false, access: { has: function (obj) { return "outline" in obj; }, get: function (obj) { return obj.outline; }, set: function (obj, value) { obj.outline = value; } }, metadata: _metadata }, _outline_initializers, _outline_extraInitializers);
        __esDecorate(null, null, _disabled_decorators, { kind: "field", name: "disabled", static: false, private: false, access: { has: function (obj) { return "disabled" in obj; }, get: function (obj) { return obj.disabled; }, set: function (obj, value) { obj.disabled = value; } }, metadata: _metadata }, _disabled_initializers, _disabled_extraInitializers);
        __esDecorate(null, null, _value_decorators, { kind: "field", name: "value", static: false, private: false, access: { has: function (obj) { return "value" in obj; }, get: function (obj) { return obj.value; }, set: function (obj, value) { obj.value = value; } }, metadata: _metadata }, _value_initializers, _value_extraInitializers);
        __esDecorate(null, null, _internals_decorators, { kind: "field", name: "internals", static: false, private: false, access: { has: function (obj) { return "internals" in obj; }, get: function (obj) { return obj.internals; }, set: function (obj, value) { obj.internals = value; } }, metadata: _metadata }, _internals_initializers, _internals_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ItButton = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ItButton = _classThis;
}();
exports.ItButton = ItButton;
var templateObject_1;
