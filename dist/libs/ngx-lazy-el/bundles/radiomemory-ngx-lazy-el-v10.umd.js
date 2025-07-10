(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/core'), require('@angular/elements'), require('rxjs')) :
    typeof define === 'function' && define.amd ? define('@radiomemory/ngx-lazy-el-v10', ['exports', '@angular/common', '@angular/core', '@angular/elements', 'rxjs'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.radiomemory = global.radiomemory || {}, global.radiomemory["ngx-lazy-el-v10"] = {}), global.ng.common, global.ng.core, global.ng.elements, global.rxjs));
})(this, (function (exports, common, i0, elements, rxjs) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n["default"] = e;
        return Object.freeze(n);
    }

    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise, SuppressedError, Symbol, Iterator */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
        function accept(f) { if (f !== void 0 && typeof f !== "function")
            throw new TypeError("Function expected"); return f; }
        var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
        var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
        var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
        var _, done = false;
        for (var i = decorators.length - 1; i >= 0; i--) {
            var context = {};
            for (var p in contextIn)
                context[p] = p === "access" ? {} : contextIn[p];
            for (var p in contextIn.access)
                context.access[p] = contextIn.access[p];
            context.addInitializer = function (f) { if (done)
                throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
            var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
            if (kind === "accessor") {
                if (result === void 0)
                    continue;
                if (result === null || typeof result !== "object")
                    throw new TypeError("Object expected");
                if (_ = accept(result.get))
                    descriptor.get = _;
                if (_ = accept(result.set))
                    descriptor.set = _;
                if (_ = accept(result.init))
                    initializers.unshift(_);
            }
            else if (_ = accept(result)) {
                if (kind === "field")
                    initializers.unshift(_);
                else
                    descriptor[key] = _;
            }
        }
        if (target)
            Object.defineProperty(target, contextIn.name, descriptor);
        done = true;
    }
    ;
    function __runInitializers(thisArg, initializers, value) {
        var useValue = arguments.length > 2;
        for (var i = 0; i < initializers.length; i++) {
            value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
        }
        return useValue ? value : void 0;
    }
    ;
    function __propKey(x) {
        return typeof x === "symbol" ? x : "".concat(x);
    }
    ;
    function __setFunctionName(f, name, prefix) {
        if (typeof name === "symbol")
            name = name.description ? "[".concat(name.description, "]") : "";
        return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
    }
    ;
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
        return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (g && (g = 0, op[0] && (_ = 0)), _)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
            desc = { enumerable: true, get: function () { return m[k]; } };
        }
        Object.defineProperty(o, k2, desc);
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2)
            for (var i = 0, l = from.length, ar; i < l; i++) {
                if (ar || !(i in from)) {
                    if (!ar)
                        ar = Array.prototype.slice.call(from, 0, i);
                    ar[i] = from[i];
                }
            }
        return to.concat(ar || Array.prototype.slice.call(from));
    }
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function () { return this; }, i;
        function awaitReturn(f) { return function (v) { return Promise.resolve(v).then(f, reject); }; }
        function verb(n, f) { if (g[n]) {
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); };
            if (f)
                i[n] = f(i[n]);
        } }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    var ownKeys = function (o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o)
                if (Object.prototype.hasOwnProperty.call(o, k))
                    ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k = ownKeys(mod), i = 0; i < k.length; i++)
                if (k[i] !== "default")
                    __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }
    function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m")
            throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    }
    function __classPrivateFieldIn(state, receiver) {
        if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function"))
            throw new TypeError("Cannot use 'in' operator on non-object");
        return typeof state === "function" ? receiver === state : state.has(receiver);
    }
    function __addDisposableResource(env, value, async) {
        if (value !== null && value !== void 0) {
            if (typeof value !== "object" && typeof value !== "function")
                throw new TypeError("Object expected.");
            var dispose, inner;
            if (async) {
                if (!Symbol.asyncDispose)
                    throw new TypeError("Symbol.asyncDispose is not defined.");
                dispose = value[Symbol.asyncDispose];
            }
            if (dispose === void 0) {
                if (!Symbol.dispose)
                    throw new TypeError("Symbol.dispose is not defined.");
                dispose = value[Symbol.dispose];
                if (async)
                    inner = dispose;
            }
            if (typeof dispose !== "function")
                throw new TypeError("Object not disposable.");
            if (inner)
                dispose = function () { try {
                    inner.call(this);
                }
                catch (e) {
                    return Promise.reject(e);
                } };
            env.stack.push({ value: value, dispose: dispose, async: async });
        }
        else if (async) {
            env.stack.push({ async: true });
        }
        return value;
    }
    var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
        var e = new Error(message);
        return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    };
    function __disposeResources(env) {
        function fail(e) {
            env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
            env.hasError = true;
        }
        var r, s = 0;
        function next() {
            while (r = env.stack.pop()) {
                try {
                    if (!r.async && s === 1)
                        return s = 0, env.stack.push(r), Promise.resolve().then(next);
                    if (r.dispose) {
                        var result = r.dispose.call(r.value);
                        if (r.async)
                            return s |= 2, Promise.resolve(result).then(next, function (e) { fail(e); return next(); });
                    }
                    else
                        s |= 1;
                }
                catch (e) {
                    fail(e);
                }
            }
            if (s === 1)
                return env.hasError ? Promise.reject(env.error) : Promise.resolve();
            if (env.hasError)
                throw env.error;
        }
        return next();
    }
    function __rewriteRelativeImportExtension(path, preserveJsx) {
        if (typeof path === "string" && /^\.\.?\//.test(path)) {
            return path.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function (m, tsx, d, ext, cm) {
                return tsx ? preserveJsx ? ".jsx" : ".js" : d && (!ext || !cm) ? m : (d + ext + "." + cm.toLowerCase() + "js");
            });
        }
        return path;
    }
    var tslib_es6 = {
        __extends: __extends,
        __assign: __assign,
        __rest: __rest,
        __decorate: __decorate,
        __param: __param,
        __esDecorate: __esDecorate,
        __runInitializers: __runInitializers,
        __propKey: __propKey,
        __setFunctionName: __setFunctionName,
        __metadata: __metadata,
        __awaiter: __awaiter,
        __generator: __generator,
        __createBinding: __createBinding,
        __exportStar: __exportStar,
        __values: __values,
        __read: __read,
        __spread: __spread,
        __spreadArrays: __spreadArrays,
        __spreadArray: __spreadArray,
        __await: __await,
        __asyncGenerator: __asyncGenerator,
        __asyncDelegator: __asyncDelegator,
        __asyncValues: __asyncValues,
        __makeTemplateObject: __makeTemplateObject,
        __importStar: __importStar,
        __importDefault: __importDefault,
        __classPrivateFieldGet: __classPrivateFieldGet,
        __classPrivateFieldSet: __classPrivateFieldSet,
        __classPrivateFieldIn: __classPrivateFieldIn,
        __addDisposableResource: __addDisposableResource,
        __disposeResources: __disposeResources,
        __rewriteRelativeImportExtension: __rewriteRelativeImportExtension,
    };

    /** Injection token to provide the element path modules. */
    var LAZY_CMPS_PATH_TOKEN = new i0.InjectionToken('ngx-lazy-cmp-registry');

    var ComponentLoaderService = /** @class */ (function () {
        function ComponentLoaderService(injector, compiler, elementModulePaths) {
            this.injector = injector;
            this.compiler = compiler;
            this.loadedCmps = new Map();
            this.elementsLoading = new Map();
            var ELEMENT_MODULE_PATHS = new Map();
            elementModulePaths.forEach(function (route) {
                ELEMENT_MODULE_PATHS.set(route.selector, route);
            });
            this.componentsToLoad = ELEMENT_MODULE_PATHS;
        }
        ComponentLoaderService.prototype.getComponentsToLoad = function () {
            return this.componentsToLoad.keys();
        };
        /**
         * Heavily inspired by the Angular elements loader on the official repo
         */
        // loadContainedCustomElements(
        //   element: HTMLElement
        // ): Observable<LazyCmpLoadedEvent[]> {
        //   const unregisteredSelectors = Array.from(
        //     this.componentsToLoad.keys()
        //   ).filter(s => element.querySelector(s));
        //   // already registered elements
        //   const alreadyRegistered = Array.from(this.loadedCmps.keys()).filter(s =>
        //     element.querySelector(s)
        //   );
        //   // add the already registered in...elements won't be recreated
        //   // the "loadComponent(...)"
        //   unregisteredSelectors.push(...alreadyRegistered);
        //   // Returns observable that completes when all discovered elements have been registered.
        //   const allRegistered = Promise.all(
        //     unregisteredSelectors.map(async s => {
        //       // element.querySelector(s).remove();
        //       const result = await this.loadComponent(s, true);
        //       return result;
        //     })
        //   );
        //   return from(allRegistered);
        // }
        ComponentLoaderService.prototype.loadContainedCustomElements = function (tags) {
            var _this = this;
            var unregisteredSelectors = Array.from(this.componentsToLoad.keys()).filter(function (s) { return tags.find(function (x) { return x.toLowerCase() === s.toLowerCase(); }); });
            // already registered elements
            var alreadyRegistered = Array.from(this.loadedCmps.keys()).filter(function (s) { return tags.find(function (x) { return x.toLowerCase() === s.toLowerCase(); }); });
            // add the already registered in...elements won't be recreated
            // the "loadComponent(...)"
            unregisteredSelectors.push.apply(unregisteredSelectors, __spread(alreadyRegistered));
            // Returns observable that completes when all discovered elements have been registered.
            var allRegistered = Promise.all(unregisteredSelectors.map(function (s) { return _this.loadComponent(s, false); }));
            return rxjs.from(allRegistered);
        };
        /**
         * Allows to lazy load a component given it's selector (i.e. tagname).
         * If the component selector has been registered, it's according module
         * will be fetched lazily
         * @param componentTag selector of the component to load
         * @param createInstance if true, creates an element and returns it in the promise
         */
        ComponentLoaderService.prototype.loadComponent = function (componentTag, createInstance) {
            if (createInstance === void 0) { createInstance = true; }
            return __awaiter(this, void 0, void 0, function () {
                var cmpRegistryEntry, path_1, loadPromise;
                var _this = this;
                return __generator(this, function (_a) {
                    if (this.elementsLoading.has(componentTag)) {
                        return [2 /*return*/, this.elementsLoading.get(componentTag)];
                    }
                    if (this.componentsToLoad.has(componentTag)) {
                        cmpRegistryEntry = this.componentsToLoad.get(componentTag);
                        path_1 = cmpRegistryEntry.loadChildren;
                        loadPromise = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                            var elementModule, moduleFactory, moduleRef, lazyModuleInstance, customElementComponent, CustomElement, componentInstance, err_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 3, , 4]);
                                        return [4 /*yield*/, path_1()];
                                    case 1:
                                        elementModule = _a.sent();
                                        moduleFactory = this.compiler.compileModuleSync(elementModule);
                                        moduleRef = moduleFactory.create(this.injector);
                                        lazyModuleInstance = moduleRef.instance;
                                        customElementComponent = void 0;
                                        if (typeof lazyModuleInstance.customElementComponent === 'object') {
                                            customElementComponent =
                                                lazyModuleInstance.customElementComponent[componentTag];
                                            if (!customElementComponent) {
                                                throw "You specified multiple component elements in module " + elementModule + " but there was no match for tag " + componentTag + " in " + JSON.stringify(lazyModuleInstance.customElementComponent) + ". Make sure the selector in the module is aligned with the one specified in the lazy module definition.";
                                            }
                                        }
                                        else {
                                            customElementComponent = lazyModuleInstance.customElementComponent;
                                        }
                                        CustomElement = elements.createCustomElement(customElementComponent, {
                                            injector: this.injector
                                        });
                                        customElements.define(componentTag, CustomElement);
                                        return [4 /*yield*/, customElements.whenDefined(componentTag)];
                                    case 2:
                                        _a.sent();
                                        this.loadedCmps.set(componentTag, elementModule);
                                        componentInstance = createInstance
                                            ? document.createElement(componentTag)
                                            : null;
                                        resolve({
                                            selector: componentTag,
                                            componentInstance: componentInstance
                                        });
                                        this.elementsLoading.delete(componentTag);
                                        this.componentsToLoad.delete(componentTag);
                                        return [3 /*break*/, 4];
                                    case 3:
                                        err_1 = _a.sent();
                                        this.elementsLoading.delete(componentTag);
                                        reject(err_1);
                                        return [3 /*break*/, 4];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); });
                        this.elementsLoading.set(componentTag, loadPromise);
                        return [2 /*return*/, loadPromise];
                    }
                    else if (this.loadedCmps.has(componentTag)) {
                        return [2 /*return*/, new Promise(function (resolve) {
                                resolve({
                                    selector: componentTag,
                                    componentInstance: createInstance
                                        ? document.createElement(componentTag)
                                        : null
                                });
                            })];
                    }
                    else {
                        throw new Error("Unrecognized component \"" + componentTag + "\". Make sure it is registered in the component registry");
                    }
                    return [2 /*return*/];
                });
            });
        };
        return ComponentLoaderService;
    }());
    /** @nocollapse */ ComponentLoaderService.ɵfac = function ComponentLoaderService_Factory(t) { return new (t || ComponentLoaderService)(i0__namespace.ɵɵinject(i0__namespace.Injector), i0__namespace.ɵɵinject(i0__namespace.Compiler), i0__namespace.ɵɵinject(LAZY_CMPS_PATH_TOKEN)); };
    /** @nocollapse */ ComponentLoaderService.ɵprov = i0__namespace.ɵɵdefineInjectable({ token: ComponentLoaderService, factory: ComponentLoaderService.ɵfac, providedIn: 'root' });
    /*@__PURE__*/ (function () {
        i0__namespace.ɵsetClassMetadata(ComponentLoaderService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], function () {
            return [{ type: i0__namespace.Injector }, { type: i0__namespace.Compiler }, { type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [LAZY_CMPS_PATH_TOKEN]
                        }] }];
        }, null);
    })();

    var LazyLoadDirective = /** @class */ (function () {
        function LazyLoadDirective(elementRef, componentLoader, cd, vcr, template) {
            this.elementRef = elementRef;
            this.componentLoader = componentLoader;
            this.cd = cd;
            this.vcr = vcr;
            this.template = template;
            // @Input() ngxLazyEl: string[] | string | null;
            this.loaded = new i0.EventEmitter();
        }
        LazyLoadDirective.prototype.ngOnInit = function () {
            var _this = this;
            var nodeTags; // = this.ngxLazyEl;
            if (!nodeTags) {
                // try to automatically infer the elemements
                var template = this.template.createEmbeddedView({});
                if (template.rootNodes[0].children.length > 0) {
                    // we probably have a container with elements in it, so try to load all of them
                    // lazily
                    nodeTags = __spread(template.rootNodes[0].children).map(function (x) { return x.tagName.toLowerCase(); });
                }
                else {
                    nodeTags = [template.rootNodes[0].tagName.toLowerCase()];
                }
            }
            if (!nodeTags) {
                throw new Error("Unable to automatically determine the dynamic element selectors. Alternatively you can pass them in via the *ngxLazyEl=\"['my-lazy-el']\"");
            }
            this.componentLoader
                // .loadContainedCustomElements(this.elementRef.nativeElement)
                .loadContainedCustomElements(nodeTags)
                .subscribe(function (elements) {
                _this.vcr.clear();
                _this.vcr.createEmbeddedView(_this.template);
                // try to get the element DOM
                var domInstance = null;
                if (_this.elementRef.nativeElement.parentElement) {
                    domInstance = _this.elementRef.nativeElement.parentElement.querySelector(elements[0].selector);
                }
                _this.notifyComponentLoaded({
                    selector: nodeTags[0],
                    componentInstance: domInstance
                });
            });
        };
        LazyLoadDirective.prototype.isIvyMode = function () {
            return this.template._declarationTContainer;
        };
        LazyLoadDirective.prototype.notifyComponentLoaded = function (lazyCmpEv) {
            this.loaded.emit({
                selector: lazyCmpEv.selector,
                componentInstance: lazyCmpEv.componentInstance
            });
        };
        LazyLoadDirective.prototype.ngOnDestroy = function () {
            console.log('lazy load destroyed');
        };
        return LazyLoadDirective;
    }());
    /** @nocollapse */ LazyLoadDirective.ɵfac = function LazyLoadDirective_Factory(t) { return new (t || LazyLoadDirective)(i0__namespace.ɵɵdirectiveInject(i0__namespace.ElementRef), i0__namespace.ɵɵdirectiveInject(ComponentLoaderService), i0__namespace.ɵɵdirectiveInject(i0__namespace.ChangeDetectorRef), i0__namespace.ɵɵdirectiveInject(i0__namespace.ViewContainerRef), i0__namespace.ɵɵdirectiveInject(i0__namespace.TemplateRef)); };
    /** @nocollapse */ LazyLoadDirective.ɵdir = i0__namespace.ɵɵdefineDirective({ type: LazyLoadDirective, selectors: [["", "ngxLazyEl", ""]], outputs: { loaded: "loaded" } });
    /*@__PURE__*/ (function () {
        i0__namespace.ɵsetClassMetadata(LazyLoadDirective, [{
                type: i0.Directive,
                args: [{
                        selector: '[ngxLazyEl]'
                    }]
            }], function () { return [{ type: i0__namespace.ElementRef }, { type: ComponentLoaderService }, { type: i0__namespace.ChangeDetectorRef }, { type: i0__namespace.ViewContainerRef }, { type: i0__namespace.TemplateRef }]; }, { loaded: [{
                    type: i0.Output
                }] });
    })();

    var NgxLazyElModule = /** @class */ (function () {
        function NgxLazyElModule() {
        }
        NgxLazyElModule.forRoot = function (modulePaths) {
            return {
                ngModule: NgxLazyElModule,
                providers: [
                    // { provide: NgModuleFactoryLoader, useClass: SystemJsNgModuleLoader },
                    {
                        provide: LAZY_CMPS_PATH_TOKEN,
                        useValue: modulePaths
                    }
                ]
            };
        };
        return NgxLazyElModule;
    }());
    /** @nocollapse */ NgxLazyElModule.ɵmod = i0__namespace.ɵɵdefineNgModule({ type: NgxLazyElModule });
    /** @nocollapse */ NgxLazyElModule.ɵinj = i0__namespace.ɵɵdefineInjector({ factory: function NgxLazyElModule_Factory(t) { return new (t || NgxLazyElModule)(); }, imports: [[common.CommonModule]] });
    (function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0__namespace.ɵɵsetNgModuleScope(NgxLazyElModule, { declarations: [LazyLoadDirective], imports: [common.CommonModule], exports: [LazyLoadDirective] }); })();
    /*@__PURE__*/ (function () {
        i0__namespace.ɵsetClassMetadata(NgxLazyElModule, [{
                type: i0.NgModule,
                args: [{
                        imports: [common.CommonModule],
                        declarations: [LazyLoadDirective],
                        exports: [LazyLoadDirective]
                    }]
            }], null, null);
    })();

    /**
     * Generated bundle index. Do not edit.
     */

    exports.ComponentLoaderService = ComponentLoaderService;
    exports.LazyLoadDirective = LazyLoadDirective;
    exports.NgxLazyElModule = NgxLazyElModule;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=radiomemory-ngx-lazy-el-v10.umd.js.map
