import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { InjectionToken, Injectable, Inject, EventEmitter, Directive, Output, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { from } from 'rxjs';

/** Injection token to provide the element path modules. */
const LAZY_CMPS_PATH_TOKEN = new InjectionToken('ngx-lazy-cmp-registry');

class ComponentLoaderService {
    constructor(injector, elementModulePaths) {
        this.injector = injector;
        this.loadedCmps = new Map();
        this.elementsLoading = new Map();
        const ELEMENT_MODULE_PATHS = new Map();
        elementModulePaths.forEach(route => {
            ELEMENT_MODULE_PATHS.set(route.selector, route);
        });
        this.componentsToLoad = ELEMENT_MODULE_PATHS;
    }
    getComponentsToLoad() {
        return this.componentsToLoad.keys();
    }
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
    loadContainedCustomElements(tags) {
        const unregisteredSelectors = Array.from(this.componentsToLoad.keys()).filter(s => tags.find(x => x.toLowerCase() === s.toLowerCase()));
        // already registered elements
        const alreadyRegistered = Array.from(this.loadedCmps.keys()).filter(s => tags.find(x => x.toLowerCase() === s.toLowerCase()));
        // add the already registered in...elements won't be recreated
        // the "loadComponent(...)"
        unregisteredSelectors.push(...alreadyRegistered);
        // Returns observable that completes when all discovered elements have been registered.
        const allRegistered = Promise.all(unregisteredSelectors.map(s => this.loadComponent(s, false)));
        return from(allRegistered);
    }
    /**
     * Allows to lazy load a component given it's selector (i.e. tagname).
     * If the component selector has been registered, it's according module
     * will be fetched lazily
     * @param componentTag selector of the component to load
     * @param createInstance if true, creates an element and returns it in the promise
     */
    loadComponent(componentTag, createInstance = true) {
        if (this.elementsLoading.has(componentTag)) {
            return this.elementsLoading.get(componentTag);
        }
        if (this.componentsToLoad.has(componentTag)) {
            const cmpRegistryEntry = this.componentsToLoad.get(componentTag);
            const path = cmpRegistryEntry.loadChildren;
            const loadPromise = new Promise((resolve, reject) => {
                path()
                    .then(elementModule => {
                    try {
                        let customElementComponent;
                        if (typeof elementModule.customElementComponent === 'object') {
                            customElementComponent =
                                elementModule.customElementComponent[componentTag];
                            if (!customElementComponent) {
                                throw `You specified multiple component elements in module ${elementModule} but there was no match for tag ${componentTag} in ${JSON.stringify(elementModule.customElementComponent)}. Make sure the selector in the module is aligned with the one specified in the lazy module definition.`;
                            }
                        }
                        else {
                            customElementComponent = elementModule.customElementComponent;
                        }
                        const CustomElement = createCustomElement(customElementComponent, {
                            injector: this.injector
                        });
                        // define the Angular Element
                        customElements.define(componentTag, CustomElement);
                        customElements
                            .whenDefined(componentTag)
                            .then(() => {
                            // remember for next time
                            this.loadedCmps.set(componentTag, elementModule);
                            // instantiate the component
                            const componentInstance = createInstance
                                ? document.createElement(componentTag)
                                : null;
                            // const componentInstance = null;
                            resolve({
                                selector: componentTag,
                                componentInstance
                            });
                        })
                            .then(() => {
                            this.elementsLoading.delete(componentTag);
                            this.componentsToLoad.delete(componentTag);
                        })
                            .catch(err => {
                            this.elementsLoading.delete(componentTag);
                            return Promise.reject(err);
                        });
                    }
                    catch (err) {
                        reject(err);
                        throw err;
                    }
                })
                    .catch(err => {
                    this.elementsLoading.delete(componentTag);
                    return Promise.reject(err);
                });
            });
            this.elementsLoading.set(componentTag, loadPromise);
            return loadPromise;
        }
        else if (this.loadedCmps.has(componentTag)) {
            // component already loaded
            return new Promise(resolve => {
                resolve({
                    selector: componentTag,
                    componentInstance: createInstance
                        ? document.createElement(componentTag)
                        : null
                });
            });
        }
        else {
            throw new Error(`Unrecognized component "${componentTag}". Make sure it is registered in the component registry`);
        }
    }
    /** @nocollapse */ static { this.ɵfac = function ComponentLoaderService_Factory(t) { return new (t || ComponentLoaderService)(i0.ɵɵinject(i0.Injector), i0.ɵɵinject(LAZY_CMPS_PATH_TOKEN)); }; }
    /** @nocollapse */ static { this.ɵprov = /** @pureOrBreakMyCode */ i0.ɵɵdefineInjectable({ token: ComponentLoaderService, factory: ComponentLoaderService.ɵfac, providedIn: 'root' }); }
}
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ComponentLoaderService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: i0.Injector }, { type: undefined, decorators: [{
                type: Inject,
                args: [LAZY_CMPS_PATH_TOKEN]
            }] }]; }, null); })();

class LazyLoadDirective {
    constructor(elementRef, componentLoader, cd, vcr, template) {
        this.elementRef = elementRef;
        this.componentLoader = componentLoader;
        this.cd = cd;
        this.vcr = vcr;
        this.template = template;
        // @Input() ngxLazyEl: string[] | string | null;
        this.loaded = new EventEmitter();
    }
    ngOnInit() {
        let nodeTags; // = this.ngxLazyEl;
        if (!nodeTags) {
            // try to automatically infer the elemements
            const template = this.template.createEmbeddedView({});
            if (template.rootNodes[0].children.length > 0) {
                // we probably have a container with elements in it, so try to load all of them
                // lazily
                nodeTags = [...template.rootNodes[0].children].map(x => x.tagName.toLowerCase());
            }
            else {
                nodeTags = [template.rootNodes[0].tagName.toLowerCase()];
            }
        }
        if (!nodeTags) {
            throw new Error(`Unable to automatically determine the dynamic element selectors. Alternatively you can pass them in via the *ngxLazyEl="['my-lazy-el']"`);
        }
        this.componentLoader
            // .loadContainedCustomElements(this.elementRef.nativeElement)
            .loadContainedCustomElements(nodeTags)
            .subscribe(elements => {
            this.vcr.clear();
            this.vcr.createEmbeddedView(this.template);
            // try to get the element DOM
            let domInstance = null;
            if (this.elementRef.nativeElement.parentElement) {
                domInstance = this.elementRef.nativeElement.parentElement.querySelector(elements[0].selector);
            }
            this.notifyComponentLoaded({
                selector: nodeTags[0],
                componentInstance: domInstance
            });
        });
    }
    isIvyMode() {
        return this.template._declarationTContainer;
    }
    notifyComponentLoaded(lazyCmpEv) {
        this.loaded.emit({
            selector: lazyCmpEv.selector,
            componentInstance: lazyCmpEv.componentInstance
        });
    }
    ngOnDestroy() {
        console.log('lazy load destroyed');
    }
    /** @nocollapse */ static { this.ɵfac = function LazyLoadDirective_Factory(t) { return new (t || LazyLoadDirective)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(ComponentLoaderService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i0.ViewContainerRef), i0.ɵɵdirectiveInject(i0.TemplateRef)); }; }
    /** @nocollapse */ static { this.ɵdir = /** @pureOrBreakMyCode */ i0.ɵɵdefineDirective({ type: LazyLoadDirective, selectors: [["", "ngxLazyEl", ""]], outputs: { loaded: "loaded" } }); }
}
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LazyLoadDirective, [{
        type: Directive,
        args: [{
                selector: '[ngxLazyEl]'
            }]
    }], function () { return [{ type: i0.ElementRef }, { type: ComponentLoaderService }, { type: i0.ChangeDetectorRef }, { type: i0.ViewContainerRef }, { type: i0.TemplateRef }]; }, { loaded: [{
            type: Output
        }] }); })();

class NgxLazyElModule {
    static forRoot(modulePaths) {
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
    }
    /** @nocollapse */ static { this.ɵfac = function NgxLazyElModule_Factory(t) { return new (t || NgxLazyElModule)(); }; }
    /** @nocollapse */ static { this.ɵmod = /** @pureOrBreakMyCode */ i0.ɵɵdefineNgModule({ type: NgxLazyElModule }); }
    /** @nocollapse */ static { this.ɵinj = /** @pureOrBreakMyCode */ i0.ɵɵdefineInjector({ imports: [CommonModule] }); }
}
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NgxLazyElModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule],
                declarations: [LazyLoadDirective],
                exports: [LazyLoadDirective]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NgxLazyElModule, { declarations: [LazyLoadDirective], imports: [CommonModule], exports: [LazyLoadDirective] }); })();

/**
 * Generated bundle index. Do not edit.
 */

export { ComponentLoaderService, LazyLoadDirective, NgxLazyElModule };
//# sourceMappingURL=juristr-ngx-lazy-el.mjs.map
