import { __awaiter } from "tslib";
import { Injectable, Injector, Inject, Compiler } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { LAZY_CMPS_PATH_TOKEN } from './tokens';
import { from } from 'rxjs';
import * as i0 from "@angular/core";
export class ComponentLoaderService {
    constructor(injector, compiler, elementModulePaths) {
        this.injector = injector;
        this.compiler = compiler;
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
        return __awaiter(this, void 0, void 0, function* () {
            if (this.elementsLoading.has(componentTag)) {
                return this.elementsLoading.get(componentTag);
            }
            if (this.componentsToLoad.has(componentTag)) {
                const cmpRegistryEntry = this.componentsToLoad.get(componentTag);
                const path = cmpRegistryEntry.loadChildren;
                const loadPromise = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                    try {
                        const elementModule = yield path();
                        const moduleFactory = this.compiler.compileModuleSync(elementModule);
                        const moduleRef = moduleFactory.create(this.injector);
                        const lazyModuleInstance = moduleRef.instance;
                        let customElementComponent;
                        if (typeof lazyModuleInstance.customElementComponent === 'object') {
                            customElementComponent =
                                lazyModuleInstance.customElementComponent[componentTag];
                            if (!customElementComponent) {
                                throw `You specified multiple component elements in module ${elementModule} but there was no match for tag ${componentTag} in ${JSON.stringify(lazyModuleInstance.customElementComponent)}. Make sure the selector in the module is aligned with the one specified in the lazy module definition.`;
                            }
                        }
                        else {
                            customElementComponent = lazyModuleInstance.customElementComponent;
                        }
                        const CustomElement = createCustomElement(customElementComponent, {
                            injector: this.injector
                        });
                        customElements.define(componentTag, CustomElement);
                        yield customElements.whenDefined(componentTag);
                        this.loadedCmps.set(componentTag, elementModule);
                        const componentInstance = createInstance
                            ? document.createElement(componentTag)
                            : null;
                        resolve({
                            selector: componentTag,
                            componentInstance
                        });
                        this.elementsLoading.delete(componentTag);
                        this.componentsToLoad.delete(componentTag);
                    }
                    catch (err) {
                        this.elementsLoading.delete(componentTag);
                        reject(err);
                    }
                }));
                this.elementsLoading.set(componentTag, loadPromise);
                return loadPromise;
            }
            else if (this.loadedCmps.has(componentTag)) {
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
        });
    }
}
/** @nocollapse */ ComponentLoaderService.ɵfac = function ComponentLoaderService_Factory(t) { return new (t || ComponentLoaderService)(i0.ɵɵinject(i0.Injector), i0.ɵɵinject(i0.Compiler), i0.ɵɵinject(LAZY_CMPS_PATH_TOKEN)); };
/** @nocollapse */ ComponentLoaderService.ɵprov = i0.ɵɵdefineInjectable({ token: ComponentLoaderService, factory: ComponentLoaderService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(ComponentLoaderService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: i0.Injector }, { type: i0.Compiler }, { type: undefined, decorators: [{
                type: Inject,
                args: [LAZY_CMPS_PATH_TOKEN]
            }] }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LWxvYWRlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii93b3Jrc3BhY2Uvbmd4LWxhenktZWwvbGlicy9uZ3gtbGF6eS1lbC9zcmMvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50LWxvYWRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsVUFBVSxFQUNWLFFBQVEsRUFDUixNQUFNLEVBRU4sUUFBUSxFQUNULE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3hELE9BQU8sRUFBb0Isb0JBQW9CLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDbEUsT0FBTyxFQUFrQixJQUFJLEVBQUUsTUFBTSxNQUFNLENBQUM7O0FBVzVDLE1BQU0sT0FBTyxzQkFBc0I7SUFLakMsWUFDVSxRQUFrQixFQUNsQixRQUFrQixFQUUxQixrQkFHRztRQU5LLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUxwQixlQUFVLEdBQUcsSUFBSSxHQUFHLEVBQTRCLENBQUM7UUFDakQsb0JBQWUsR0FBRyxJQUFJLEdBQUcsRUFBdUMsQ0FBQztRQVd2RSxNQUFNLG9CQUFvQixHQUFHLElBQUksR0FBRyxFQUFlLENBQUM7UUFDcEQsa0JBQWtCLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2pDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2xELENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLGdCQUFnQixHQUFHLG9CQUFvQixDQUFDO0lBQy9DLENBQUM7SUFFRCxtQkFBbUI7UUFDakIsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDdEMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsK0JBQStCO0lBQy9CLHlCQUF5QjtJ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RUFBRSxXQUFXLENBQUMsQ0FBQztnQkFDcEQsT0FBTyxXQUFXLENBQUM7YUFDcEI7aUJBQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsRUFBRTtnQkFDNUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtvQkFDM0IsT0FBTyxDQUFDO3dCQUNOLFFBQVEsRUFBRSxZQUFZO3dCQUN0QixpQkFBaUIsRUFBRSxjQUFjOzRCQUMvQixDQUFDLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUM7NEJBQ3RDLENBQUMsQ0FBQyxJQUFJO3FCQUNULENBQUMsQ0FBQztnQkFDTCxDQUFDLENBQUMsQ0FBQzthQUNKO2lCQUFNO2dCQUNMLE1BQU0sSUFBSSxLQUFLLENBQ2IsMkJBQTJCLFlBQVkseURBQXlELENBQ2pHLENBQUM7YUFDSDtRQUNILENBQUM7S0FBQTs7K0dBOUpVLHNCQUFzQixrRUFRdkIsb0JBQW9CO2lGQVJuQixzQkFBc0IsV0FBdEIsc0JBQXNCLG1CQUZyQixNQUFNO2tEQUVQLHNCQUFzQjtjQUhsQyxVQUFVO2VBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7O3NCQVNJLE1BQU07dUJBQUMsb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgSW5qZWN0YWJsZSxcbiAgSW5qZWN0b3IsXG4gIEluamVjdCxcbiAgTmdNb2R1bGVSZWYsXG4gIENvbXBpbGVyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgY3JlYXRlQ3VzdG9tRWxlbWVudCB9IGZyb20gJ0Bhbmd1bGFyL2VsZW1lbnRzJztcbmltcG9ydCB7IExhenlDb21wb25lbnREZWYsIExBWllfQ01QU19QQVRIX1RPS0VOIH0gZnJvbSAnLi90b2tlbnMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YsIGZyb20gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IExhenlDbXBMb2FkZWRFdmVudCB9IGZyb20gJy4vbGF6eS1jbXAtbG9hZGVkLWV2ZW50JztcbmltcG9ydCB7IExvYWRDaGlsZHJlbkNhbGxiYWNrIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuaW50ZXJmYWNlIExhenlNb2R1bGUge1xuICBjdXN0b21FbGVtZW50Q29tcG9uZW50OiBhbnk7XG59XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIENvbXBvbmVudExvYWRlclNlcnZpY2Uge1xuICBwcml2YXRlIGNvbXBvbmVudHNUb0xvYWQ6IE1hcDxzdHJpbmcsIExhenlDb21wb25lbnREZWY+O1xuICBwcml2YXRlIGxvYWRlZENtcHMgPSBuZXcgTWFwPHN0cmluZywgTmdNb2R1bGVSZWY8YW55Pj4oKTtcbiAgcHJpdmF0ZSBlbGVtZW50c0xvYWRpbmcgPSBuZXcgTWFwPHN0cmluZywgUHJvbWlzZTxMYXp5Q21wTG9hZGVkRXZlbnQ+PigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgIHByaXZhdGUgY29tcGlsZXI6IENvbXBpbGVyLFxuICAgIEBJbmplY3QoTEFaWV9DTVBTX1BBVEhfVE9LRU4pXG4gICAgZWxlbWVudE1vZHVsZVBhdGhzOiB7XG4gICAgICBzZWxlY3Rvcjogc3RyaW5nO1xuICAgICAgbG9hZENoaWxkcmVuOiBMb2FkQ2hpbGRyZW5DYWxsYmFjaztcbiAgICB9W11cbiAgKSB7XG4gICAgY29uc3QgRUxFTUVOVF9NT0RVTEVfUEFUSFMgPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xuICAgIGVsZW1lbnRNb2R1bGVQYXRocy5mb3JFYWNoKHJvdXRlID0+IHtcbiAgICAgIEVMRU1FTlRfTU9EVUxFX1BBVEhTLnNldChyb3V0ZS5zZWxlY3Rvciwgcm91dGUpO1xuICAgIH0pO1xuICAgIHRoaXMuY29tcG9uZW50c1RvTG9hZCA9IEVMRU1FTlRfTU9EVUxFX1BBVEhTO1xuICB9XG5cbiAgZ2V0Q29tcG9uZW50c1RvTG9hZCgpIHtcbiAgICByZXR1cm4gdGhpcy5jb21wb25lbnRzVG9Mb2FkLmtleXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIZWF2aWx5IGluc3BpcmVkIGJ5IHRoZSBBbmd1bGFyIGVsZW1lbnRzIGxvYWRlciBvbiB0aGUgb2ZmaWNpYWwgcmVwb1xuICAgKi9cbiAgLy8gbG9hZENvbnRhaW5lZEN1c3RvbUVsZW1lbnRzKFxuICAvLyAgIGVsZW1lbnQ6IEhUTUxFbGVtZW50XG4gIC8vICk6IE9ic2VydmFibGU8TGF6eUNtcExvYWRlZEV2ZW50W10+IHtcbiAgLy8gICBjb25zdCB1bnJlZ2lzdGVyZWRTZWxlY3RvcnMgPSBBcnJheS5mcm9tKFxuICAvLyAgICAgdGhpcy5jb21wb25lbnRzVG9Mb2FkLmtleXMoKVxuICAvLyAgICkuZmlsdGVyKHMgPT4gZWxlbWVudC5xdWVyeVNlbGVjdG9yKHMpKTtcblxuICAvLyAgIC8vIGFscmVhZHkgcmVnaXN0ZXJlZCBlbGVtZW50c1xuICAvLyAgIGNvbnN0IGFscmVhZHlSZWdpc3RlcmVkID0gQXJyYXkuZnJvbSh0aGlzLmxvYWRlZENtcHMua2V5cygpKS5maWx0ZXIocyA9PlxuICAvLyAgICAgZWxlbWVudC5xdWVyeVNlbGVjdG9yKHMpXG4gIC8vICAgKTtcblxuICAvLyAgIC8vIGFkZCB0aGUgYWxyZWFkeSByZWdpc3RlcmVkIGluLi4uZWxlbWVudHMgd29uJ3QgYmUgcmVjcmVhdGVkXG4gIC8vICAgLy8gdGhlIFwibG9hZENvbXBvbmVudCguLi4pXCJcbiAgLy8gICB1bnJlZ2lzdGVyZWRTZWxlY3RvcnMucHVzaCguLi5hbHJlYWR5UmVnaXN0ZXJlZCk7XG5cbiAgLy8gICAvLyBSZXR1cm5zIG9ic2VydmFibGUgdGhhdCBjb21wbGV0ZXMgd2hlbiBhbGwgZGlzY292ZXJlZCBlbGVtZW50cyBoYXZlIGJlZW4gcmVnaXN0ZXJlZC5cbiAgLy8gICBjb25zdCBhbGxSZWdpc3RlcmVkID0gUHJvbWlzZS5hbGwoXG4gIC8vICAgICB1bnJlZ2lzdGVyZWRTZWxlY3RvcnMubWFwKGFzeW5jIHMgPT4ge1xuICAvLyAgICAgICAvLyBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IocykucmVtb3ZlKCk7XG4gIC8vICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMubG9hZENvbXBvbmVudChzLCB0cnVlKTtcbiAgLy8gICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgLy8gICAgIH0pXG4gIC8vICAgKTtcbiAgLy8gICByZXR1cm4gZnJvbShhbGxSZWdpc3RlcmVkKTtcbiAgLy8gfVxuXG4gIGxvYWRDb250YWluZWRDdXN0b21FbGVtZW50cyhcbiAgICB0YWdzOiBzdHJpbmdbXVxuICApOiBPYnNlcnZhYmxlPExhenlDbXBMb2FkZWRFdmVudFtdPiB7XG4gICAgY29uc3QgdW5yZWdpc3RlcmVkU2VsZWN0b3JzID0gQXJyYXkuZnJvbShcbiAgICAgIHRoaXMuY29tcG9uZW50c1RvTG9hZC5rZXlzKClcbiAgICApLmZpbHRlcihzID0+IHRhZ3MuZmluZCh4ID0+IHgudG9Mb3dlckNhc2UoKSA9PT0gcy50b0xvd2VyQ2FzZSgpKSk7XG5cbiAgICAvLyBhbHJlYWR5IHJlZ2lzdGVyZWQgZWxlbWVudHNcbiAgICBjb25zdCBhbHJlYWR5UmVnaXN0ZXJlZCA9IEFycmF5LmZyb20odGhpcy5sb2FkZWRDbXBzLmtleXMoKSkuZmlsdGVyKHMgPT5cbiAgICAgIHRhZ3MuZmluZCh4ID0+IHgudG9Mb3dlckNhc2UoKSA9PT0gcy50b0xvd2VyQ2FzZSgpKVxuICAgICk7XG5cbiAgICAvLyBhZGQgdGhlIGFscmVhZHkgcmVnaXN0ZXJlZCBpbi4uLmVsZW1lbnRzIHdvbid0IGJlIHJlY3JlYXRlZFxuICAgIC8vIHRoZSBcImxvYWRDb21wb25lbnQoLi4uKVwiXG4gICAgdW5yZWdpc3RlcmVkU2VsZWN0b3JzLnB1c2goLi4uYWxyZWFkeVJlZ2lzdGVyZWQpO1xuXG4gICAgLy8gUmV0dXJucyBvYnNlcnZhYmxlIHRoYXQgY29tcGxldGVzIHdoZW4gYWxsIGRpc2NvdmVyZWQgZWxlbWVudHMgaGF2ZSBiZWVuIHJlZ2lzdGVyZWQuXG4gICAgY29uc3QgYWxsUmVnaXN0ZXJlZCA9IFByb21pc2UuYWxsKFxuICAgICAgdW5yZWdpc3RlcmVkU2VsZWN0b3JzLm1hcChzID0+IHRoaXMubG9hZENvbXBvbmVudChzLCBmYWxzZSkpXG4gICAgKTtcbiAgICByZXR1cm4gZnJvbShhbGxSZWdpc3RlcmVkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBbGxvd3MgdG8gbGF6eSBsb2FkIGEgY29tcG9uZW50IGdpdmVuIGl0J3Mgc2VsZWN0b3IgKGkuZS4gdGFnbmFtZSkuXG4gICAqIElmIHRoZSBjb21wb25lbnQgc2VsZWN0b3IgaGFzIGJlZW4gcmVnaXN0ZXJlZCwgaXQncyBhY2NvcmRpbmcgbW9kdWxlXG4gICAqIHdpbGwgYmUgZmV0Y2hlZCBsYXppbHlcbiAgICogQHBhcmFtIGNvbXBvbmVudFRhZyBzZWxlY3RvciBvZiB0aGUgY29tcG9uZW50IHRvIGxvYWRcbiAgICogQHBhcmFtIGNyZWF0ZUluc3RhbmNlIGlmIHRydWUsIGNyZWF0ZXMgYW4gZWxlbWVudCBhbmQgcmV0dXJucyBpdCBpbiB0aGUgcHJvbWlzZVxuICAgKi9cbiAgYXN5bmMgbG9hZENvbXBvbmVudChcbiAgICBjb21wb25lbnRUYWc6IHN0cmluZyxcbiAgICBjcmVhdGVJbnN0YW5jZSA9IHRydWVcbiAgKTogUHJvbWlzZTxMYXp5Q21wTG9hZGVkRXZlbnQ+IHtcbiAgICBpZiAodGhpcy5lbGVtZW50c0xvYWRpbmcuaGFzKGNvbXBvbmVudFRhZykpIHtcbiAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRzTG9hZGluZy5nZXQoY29tcG9uZW50VGFnKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jb21wb25lbnRzVG9Mb2FkLmhhcyhjb21wb25lbnRUYWcpKSB7XG4gICAgICBjb25zdCBjbXBSZWdpc3RyeUVudHJ5ID0gdGhpcy5jb21wb25lbnRzVG9Mb2FkLmdldChjb21wb25lbnRUYWcpO1xuICAgICAgY29uc3QgcGF0aCA9IGNtcFJlZ2lzdHJ5RW50cnkubG9hZENoaWxkcmVuO1xuXG4gICAgICBjb25zdCBsb2FkUHJvbWlzZSA9IG5ldyBQcm9taXNlPExhenlDbXBMb2FkZWRFdmVudD4oYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IGVsZW1lbnRNb2R1bGUgPSBhd2FpdCAocGF0aCgpIGFzIFByb21pc2U8YW55Pik7XG4gICAgICAgICAgY29uc3QgbW9kdWxlRmFjdG9yeSA9IHRoaXMuY29tcGlsZXIuY29tcGlsZU1vZHVsZVN5bmMoZWxlbWVudE1vZHVsZSk7XG4gICAgICAgICAgY29uc3QgbW9kdWxlUmVmID0gbW9kdWxlRmFjdG9yeS5jcmVhdGUodGhpcy5pbmplY3Rvcik7XG4gICAgICAgICAgY29uc3QgbGF6eU1vZHVsZUluc3RhbmNlID0gbW9kdWxlUmVmLmluc3RhbmNlIGFzIExhenlNb2R1bGU7XG4gICAgICAgICAgbGV0IGN1c3RvbUVsZW1lbnRDb21wb25lbnQ7XG5cbiAgICAgICAgICBpZiAodHlwZW9mIGxhenlNb2R1bGVJbnN0YW5jZS5jdXN0b21FbGVtZW50Q29tcG9uZW50ID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgY3VzdG9tRWxlbWVudENvbXBvbmVudCA9XG4gICAgICAgICAgICAgIGxhenlNb2R1bGVJbnN0YW5jZS5jdXN0b21FbGVtZW50Q29tcG9uZW50W2NvbXBvbmVudFRhZ107XG4gICAgICAgICAgICBpZiAoIWN1c3RvbUVsZW1lbnRDb21wb25lbnQpIHtcbiAgICAgICAgICAgICAgdGhyb3cgYFlvdSBzcGVjaWZpZWQgbXVsdGlwbGUgY29tcG9uZW50IGVsZW1lbnRzIGluIG1vZHVsZSAke2VsZW1lbnRNb2R1bGV9IGJ1dCB0aGVyZSB3YXMgbm8gbWF0Y2ggZm9yIHRhZyAke2NvbXBvbmVudFRhZ30gaW4gJHtKU09OLnN0cmluZ2lmeShcbiAgICAgICAgICAgICAgICBsYXp5TW9kdWxlSW5zdGFuY2UuY3VzdG9tRWxlbWVudENvbXBvbmVudFxuICAgICAgICAgICAgICApfS4gTWFrZSBzdXJlIHRoZSBzZWxlY3RvciBpbiB0aGUgbW9kdWxlIGlzIGFsaWduZWQgd2l0aCB0aGUgb25lIHNwZWNpZmllZCBpbiB0aGUgbGF6eSBtb2R1bGUgZGVmaW5pdGlvbi5gO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjdXN0b21FbGVtZW50Q29tcG9uZW50ID0gbGF6eU1vZHVsZUluc3RhbmNlLmN1c3RvbUVsZW1lbnRDb21wb25lbnQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgQ3VzdG9tRWxlbWVudCA9IGNyZWF0ZUN1c3RvbUVsZW1lbnQoY3VzdG9tRWxlbWVudENvbXBvbmVudCwge1xuICAgICAgICAgICAgaW5qZWN0b3I6IHRoaXMuaW5qZWN0b3JcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGN1c3RvbUVsZW1lbnRzIS5kZWZpbmUoY29tcG9uZW50VGFnLCBDdXN0b21FbGVtZW50KTtcbiAgICAgICAgICBhd2FpdCBjdXN0b21FbGVtZW50cy53aGVuRGVmaW5lZChjb21wb25lbnRUYWcpO1xuXG4gICAgICAgICAgdGhpcy5sb2FkZWRDbXBzLnNldChjb21wb25lbnRUYWcsIGVsZW1lbnRNb2R1bGUpO1xuICAgICAgICAgIGNvbnN0IGNvbXBvbmVudEluc3RhbmNlID0gY3JlYXRlSW5zdGFuY2VcbiAgICAgICAgICAgID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChjb21wb25lbnRUYWcpXG4gICAgICAgICAgICA6IG51bGw7XG5cbiAgICAgICAgICByZXNvbHZlKHtcbiAgICAgICAgICAgIHNlbGVjdG9yOiBjb21wb25lbnRUYWcsXG4gICAgICAgICAgICBjb21wb25lbnRJbnN0YW5jZVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdGhpcy5lbGVtZW50c0xvYWRpbmcuZGVsZXRlKGNvbXBvbmVudFRhZyk7XG4gICAgICAgICAgdGhpcy5jb21wb25lbnRzVG9Mb2FkLmRlbGV0ZShjb21wb25lbnRUYWcpO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICB0aGlzLmVsZW1lbnRzTG9hZGluZy5kZWxldGUoY29tcG9uZW50VGFnKTtcbiAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuZWxlbWVudHNMb2FkaW5nLnNldChjb21wb25lbnRUYWcsIGxvYWRQcm9taXNlKTtcbiAgICAgIHJldHVybiBsb2FkUHJvbWlzZTtcbiAgICB9IGVsc2UgaWYgKHRoaXMubG9hZGVkQ21wcy5oYXMoY29tcG9uZW50VGFnKSkge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICByZXNvbHZlKHtcbiAgICAgICAgICBzZWxlY3RvcjogY29tcG9uZW50VGFnLFxuICAgICAgICAgIGNvbXBvbmVudEluc3RhbmNlOiBjcmVhdGVJbnN0YW5jZVxuICAgICAgICAgICAgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGNvbXBvbmVudFRhZylcbiAgICAgICAgICAgIDogbnVsbFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBVbnJlY29nbml6ZWQgY29tcG9uZW50IFwiJHtjb21wb25lbnRUYWd9XCIuIE1ha2Ugc3VyZSBpdCBpcyByZWdpc3RlcmVkIGluIHRoZSBjb21wb25lbnQgcmVnaXN0cnlgXG4gICAgICApO1xuICAgIH1cbiAgfVxufVxuIl19