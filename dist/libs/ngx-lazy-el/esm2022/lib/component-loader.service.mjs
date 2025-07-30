import { Injectable, Injector, Inject } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { LAZY_CMPS_PATH_TOKEN } from './tokens';
import { from } from 'rxjs';
import * as i0 from "@angular/core";
export class ComponentLoaderService {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LWxvYWRlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbGF6eS1lbC9zcmMvbGliL2NvbXBvbmVudC1sb2FkZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsVUFBVSxFQUNWLFFBQVEsRUFDUixNQUFNLEVBRVAsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDeEQsT0FBTyxFQUFvQixvQkFBb0IsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUNsRSxPQUFPLEVBQWtCLElBQUksRUFBRSxNQUFNLE1BQU0sQ0FBQzs7QUFPNUMsTUFBTSxPQUFPLHNCQUFzQjtJQUtqQyxZQUNVLFFBQWtCLEVBRTFCLGtCQUdHO1FBTEssYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUpwQixlQUFVLEdBQUcsSUFBSSxHQUFHLEVBQTRCLENBQUM7UUFDakQsb0JBQWUsR0FBRyxJQUFJLEdBQUcsRUFBdUMsQ0FBQztRQVV2RSxNQUFNLG9CQUFvQixHQUFHLElBQUksR0FBRyxFQUFlLENBQUM7UUFDcEQsa0JBQWtCLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2pDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2xELENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLGdCQUFnQixHQUFHLG9CQUFvQixDQUFDO0lBQy9DLENBQUM7SUFFRCxtQkFBbUI7UUFDakIsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDdEMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsK0JBQStCO0lBQy9CLHlCQUF5QjtJQUN6Qix3Q0FBd0M7SUFDeEMsOENBQThDO0lBQzlDLG1DQUFtQztJQUNuQyw2Q0FBNkM7SUFFN0Ms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QyxlQUFlLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO29CQUMxQyxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzdCLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsV0FBVyxDQUFDLENBQUM7WUFDcEQsT0FBTyxXQUFXLENBQUM7U0FDcEI7YUFBTSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxFQUFFO1lBQzVDLDJCQUEyQjtZQUMzQixPQUFPLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUMzQixPQUFPLENBQUM7b0JBQ04sUUFBUSxFQUFFLFlBQVk7b0JBQ3RCLGlCQUFpQixFQUFFLGNBQWM7d0JBQy9CLENBQUMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQzt3QkFDdEMsQ0FBQyxDQUFDLElBQUk7aUJBQ1QsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7U0FDSjthQUFNO1lBQ0wsTUFBTSxJQUFJLEtBQUssQ0FDYiwyQkFBMkIsWUFBWSx5REFBeUQsQ0FDakcsQ0FBQztTQUNIO0lBQ0gsQ0FBQzswR0E1S1Usc0JBQXNCLHdDQU92QixvQkFBb0I7c0dBUG5CLHNCQUFzQixXQUF0QixzQkFBc0IsbUJBRnJCLE1BQU07O3VGQUVQLHNCQUFzQjtjQUhsQyxVQUFVO2VBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7O3NCQVFJLE1BQU07dUJBQUMsb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgSW5qZWN0YWJsZSxcbiAgSW5qZWN0b3IsXG4gIEluamVjdCxcbiAgTmdNb2R1bGVSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBjcmVhdGVDdXN0b21FbGVtZW50IH0gZnJvbSAnQGFuZ3VsYXIvZWxlbWVudHMnO1xuaW1wb3J0IHsgTGF6eUNvbXBvbmVudERlZiwgTEFaWV9DTVBTX1BBVEhfVE9LRU4gfSBmcm9tICcuL3Rva2Vucyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiwgZnJvbSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTGF6eUNtcExvYWRlZEV2ZW50IH0gZnJvbSAnLi9sYXp5LWNtcC1sb2FkZWQtZXZlbnQnO1xuaW1wb3J0IHsgTG9hZENoaWxkcmVuQ2FsbGJhY2sgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBDb21wb25lbnRMb2FkZXJTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBjb21wb25lbnRzVG9Mb2FkOiBNYXA8c3RyaW5nLCBMYXp5Q29tcG9uZW50RGVmPjtcbiAgcHJpdmF0ZSBsb2FkZWRDbXBzID0gbmV3IE1hcDxzdHJpbmcsIE5nTW9kdWxlUmVmPGFueT4+KCk7XG4gIHByaXZhdGUgZWxlbWVudHNMb2FkaW5nID0gbmV3IE1hcDxzdHJpbmcsIFByb21pc2U8TGF6eUNtcExvYWRlZEV2ZW50Pj4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvcixcbiAgICBASW5qZWN0KExBWllfQ01QU19QQVRIX1RPS0VOKVxuICAgIGVsZW1lbnRNb2R1bGVQYXRoczoge1xuICAgICAgc2VsZWN0b3I6IHN0cmluZztcbiAgICAgIGxvYWRDaGlsZHJlbjogTG9hZENoaWxkcmVuQ2FsbGJhY2s7XG4gICAgfVtdXG4gICkge1xuICAgIGNvbnN0IEVMRU1FTlRfTU9EVUxFX1BBVEhTID0gbmV3IE1hcDxzdHJpbmcsIGFueT4oKTtcbiAgICBlbGVtZW50TW9kdWxlUGF0aHMuZm9yRWFjaChyb3V0ZSA9PiB7XG4gICAgICBFTEVNRU5UX01PRFVMRV9QQVRIUy5zZXQocm91dGUuc2VsZWN0b3IsIHJvdXRlKTtcbiAgICB9KTtcbiAgICB0aGlzLmNvbXBvbmVudHNUb0xvYWQgPSBFTEVNRU5UX01PRFVMRV9QQVRIUztcbiAgfVxuXG4gIGdldENvbXBvbmVudHNUb0xvYWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29tcG9uZW50c1RvTG9hZC5rZXlzKCk7XG4gIH1cblxuICAvKipcbiAgICogSGVhdmlseSBpbnNwaXJlZCBieSB0aGUgQW5ndWxhciBlbGVtZW50cyBsb2FkZXIgb24gdGhlIG9mZmljaWFsIHJlcG9cbiAgICovXG4gIC8vIGxvYWRDb250YWluZWRDdXN0b21FbGVtZW50cyhcbiAgLy8gICBlbGVtZW50OiBIVE1MRWxlbWVudFxuICAvLyApOiBPYnNlcnZhYmxlPExhenlDbXBMb2FkZWRFdmVudFtdPiB7XG4gIC8vICAgY29uc3QgdW5yZWdpc3RlcmVkU2VsZWN0b3JzID0gQXJyYXkuZnJvbShcbiAgLy8gICAgIHRoaXMuY29tcG9uZW50c1RvTG9hZC5rZXlzKClcbiAgLy8gICApLmZpbHRlcihzID0+IGVsZW1lbnQucXVlcnlTZWxlY3RvcihzKSk7XG5cbiAgLy8gICAvLyBhbHJlYWR5IHJlZ2lzdGVyZWQgZWxlbWVudHNcbiAgLy8gICBjb25zdCBhbHJlYWR5UmVnaXN0ZXJlZCA9IEFycmF5LmZyb20odGhpcy5sb2FkZWRDbXBzLmtleXMoKSkuZmlsdGVyKHMgPT5cbiAgLy8gICAgIGVsZW1lbnQucXVlcnlTZWxlY3RvcihzKVxuICAvLyAgICk7XG5cbiAgLy8gICAvLyBhZGQgdGhlIGFscmVhZHkgcmVnaXN0ZXJlZCBpbi4uLmVsZW1lbnRzIHdvbid0IGJlIHJlY3JlYXRlZFxuICAvLyAgIC8vIHRoZSBcImxvYWRDb21wb25lbnQoLi4uKVwiXG4gIC8vICAgdW5yZWdpc3RlcmVkU2VsZWN0b3JzLnB1c2goLi4uYWxyZWFkeVJlZ2lzdGVyZWQpO1xuXG4gIC8vICAgLy8gUmV0dXJucyBvYnNlcnZhYmxlIHRoYXQgY29tcGxldGVzIHdoZW4gYWxsIGRpc2NvdmVyZWQgZWxlbWVudHMgaGF2ZSBiZWVuIHJlZ2lzdGVyZWQuXG4gIC8vICAgY29uc3QgYWxsUmVnaXN0ZXJlZCA9IFByb21pc2UuYWxsKFxuICAvLyAgICAgdW5yZWdpc3RlcmVkU2VsZWN0b3JzLm1hcChhc3luYyBzID0+IHtcbiAgLy8gICAgICAgLy8gZWxlbWVudC5xdWVyeVNlbGVjdG9yKHMpLnJlbW92ZSgpO1xuICAvLyAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLmxvYWRDb21wb25lbnQocywgdHJ1ZSk7XG4gIC8vICAgICAgIHJldHVybiByZXN1bHQ7XG4gIC8vICAgICB9KVxuICAvLyAgICk7XG4gIC8vICAgcmV0dXJuIGZyb20oYWxsUmVnaXN0ZXJlZCk7XG4gIC8vIH1cblxuICBsb2FkQ29udGFpbmVkQ3VzdG9tRWxlbWVudHMoXG4gICAgdGFnczogc3RyaW5nW11cbiAgKTogT2JzZXJ2YWJsZTxMYXp5Q21wTG9hZGVkRXZlbnRbXT4ge1xuICAgIGNvbnN0IHVucmVnaXN0ZXJlZFNlbGVjdG9ycyA9IEFycmF5LmZyb20oXG4gICAgICB0aGlzLmNvbXBvbmVudHNUb0xvYWQua2V5cygpXG4gICAgKS5maWx0ZXIocyA9PiB0YWdzLmZpbmQoeCA9PiB4LnRvTG93ZXJDYXNlKCkgPT09IHMudG9Mb3dlckNhc2UoKSkpO1xuXG4gICAgLy8gYWxyZWFkeSByZWdpc3RlcmVkIGVsZW1lbnRzXG4gICAgY29uc3QgYWxyZWFkeVJlZ2lzdGVyZWQgPSBBcnJheS5mcm9tKHRoaXMubG9hZGVkQ21wcy5rZXlzKCkpLmZpbHRlcihzID0+XG4gICAgICB0YWdzLmZpbmQoeCA9PiB4LnRvTG93ZXJDYXNlKCkgPT09IHMudG9Mb3dlckNhc2UoKSlcbiAgICApO1xuXG4gICAgLy8gYWRkIHRoZSBhbHJlYWR5IHJlZ2lzdGVyZWQgaW4uLi5lbGVtZW50cyB3b24ndCBiZSByZWNyZWF0ZWRcbiAgICAvLyB0aGUgXCJsb2FkQ29tcG9uZW50KC4uLilcIlxuICAgIHVucmVnaXN0ZXJlZFNlbGVjdG9ycy5wdXNoKC4uLmFscmVhZHlSZWdpc3RlcmVkKTtcblxuICAgIC8vIFJldHVybnMgb2JzZXJ2YWJsZSB0aGF0IGNvbXBsZXRlcyB3aGVuIGFsbCBkaXNjb3ZlcmVkIGVsZW1lbnRzIGhhdmUgYmVlbiByZWdpc3RlcmVkLlxuICAgIGNvbnN0IGFsbFJlZ2lzdGVyZWQgPSBQcm9taXNlLmFsbChcbiAgICAgIHVucmVnaXN0ZXJlZFNlbGVjdG9ycy5tYXAocyA9PiB0aGlzLmxvYWRDb21wb25lbnQocywgZmFsc2UpKVxuICAgICk7XG4gICAgcmV0dXJuIGZyb20oYWxsUmVnaXN0ZXJlZCk7XG4gIH1cblxuICAvKipcbiAgICogQWxsb3dzIHRvIGxhenkgbG9hZCBhIGNvbXBvbmVudCBnaXZlbiBpdCdzIHNlbGVjdG9yIChpLmUuIHRhZ25hbWUpLlxuICAgKiBJZiB0aGUgY29tcG9uZW50IHNlbGVjdG9yIGhhcyBiZWVuIHJlZ2lzdGVyZWQsIGl0J3MgYWNjb3JkaW5nIG1vZHVsZVxuICAgKiB3aWxsIGJlIGZldGNoZWQgbGF6aWx5XG4gICAqIEBwYXJhbSBjb21wb25lbnRUYWcgc2VsZWN0b3Igb2YgdGhlIGNvbXBvbmVudCB0byBsb2FkXG4gICAqIEBwYXJhbSBjcmVhdGVJbnN0YW5jZSBpZiB0cnVlLCBjcmVhdGVzIGFuIGVsZW1lbnQgYW5kIHJldHVybnMgaXQgaW4gdGhlIHByb21pc2VcbiAgICovXG4gIGxvYWRDb21wb25lbnQoXG4gICAgY29tcG9uZW50VGFnOiBzdHJpbmcsXG4gICAgY3JlYXRlSW5zdGFuY2UgPSB0cnVlXG4gICk6IFByb21pc2U8TGF6eUNtcExvYWRlZEV2ZW50PiB7XG4gICAgaWYgKHRoaXMuZWxlbWVudHNMb2FkaW5nLmhhcyhjb21wb25lbnRUYWcpKSB7XG4gICAgICByZXR1cm4gdGhpcy5lbGVtZW50c0xvYWRpbmcuZ2V0KGNvbXBvbmVudFRhZyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY29tcG9uZW50c1RvTG9hZC5oYXMoY29tcG9uZW50VGFnKSkge1xuICAgICAgY29uc3QgY21wUmVnaXN0cnlFbnRyeSA9IHRoaXMuY29tcG9uZW50c1RvTG9hZC5nZXQoY29tcG9uZW50VGFnKTtcblxuICAgICAgY29uc3QgcGF0aCA9IGNtcFJlZ2lzdHJ5RW50cnkubG9hZENoaWxkcmVuO1xuXG4gICAgICAgICAgICBjb25zdCBsb2FkUHJvbWlzZSA9IG5ldyBQcm9taXNlPExhenlDbXBMb2FkZWRFdmVudD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAocGF0aCgpIGFzIFByb21pc2U8YW55PilcbiAgICAgICAgICAudGhlbihlbGVtZW50TW9kdWxlID0+IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIGxldCBjdXN0b21FbGVtZW50Q29tcG9uZW50O1xuXG4gICAgICAgICAgICAgIGlmICh0eXBlb2YgZWxlbWVudE1vZHVsZS5jdXN0b21FbGVtZW50Q29tcG9uZW50ID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIGN1c3RvbUVsZW1lbnRDb21wb25lbnQgPVxuICAgICAgICAgICAgICAgICAgZWxlbWVudE1vZHVsZS5jdXN0b21FbGVtZW50Q29tcG9uZW50W2NvbXBvbmVudFRhZ107XG4gICAgICAgICAgICAgICAgaWYgKCFjdXN0b21FbGVtZW50Q29tcG9uZW50KSB7XG4gICAgICAgICAgICAgICAgICB0aHJvdyBgWW91IHNwZWNpZmllZCBtdWx0aXBsZSBjb21wb25lbnQgZWxlbWVudHMgaW4gbW9kdWxlICR7ZWxlbWVudE1vZHVsZX0gYnV0IHRoZXJlIHdhcyBubyBtYXRjaCBmb3IgdGFnICR7Y29tcG9uZW50VGFnfSBpbiAke0pTT04uc3RyaW5naWZ5KFxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50TW9kdWxlLmN1c3RvbUVsZW1lbnRDb21wb25lbnRcbiAgICAgICAgICAgICAgICAgICl9LiBNYWtlIHN1cmUgdGhlIHNlbGVjdG9yIGluIHRoZSBtb2R1bGUgaXMgYWxpZ25lZCB3aXRoIHRoZSBvbmUgc3BlY2lmaWVkIGluIHRoZSBsYXp5IG1vZHVsZSBkZWZpbml0aW9uLmA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGN1c3RvbUVsZW1lbnRDb21wb25lbnQgPSBlbGVtZW50TW9kdWxlLmN1c3RvbUVsZW1lbnRDb21wb25lbnQ7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBjb25zdCBDdXN0b21FbGVtZW50ID0gY3JlYXRlQ3VzdG9tRWxlbWVudChjdXN0b21FbGVtZW50Q29tcG9uZW50LCB7XG4gICAgICAgICAgICAgICAgaW5qZWN0b3I6IHRoaXMuaW5qZWN0b3JcbiAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgLy8gZGVmaW5lIHRoZSBBbmd1bGFyIEVsZW1lbnRcbiAgICAgICAgICAgICAgY3VzdG9tRWxlbWVudHMhLmRlZmluZShjb21wb25lbnRUYWcsIEN1c3RvbUVsZW1lbnQpO1xuICAgICAgICAgICAgICBjdXN0b21FbGVtZW50c1xuICAgICAgICAgICAgICAgIC53aGVuRGVmaW5lZChjb21wb25lbnRUYWcpXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgLy8gcmVtZW1iZXIgZm9yIG5leHQgdGltZVxuICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkZWRDbXBzLnNldChjb21wb25lbnRUYWcsIGVsZW1lbnRNb2R1bGUpO1xuICAgICAgICAgICAgICAgICAgLy8gaW5zdGFudGlhdGUgdGhlIGNvbXBvbmVudFxuICAgICAgICAgICAgICAgICAgY29uc3QgY29tcG9uZW50SW5zdGFuY2UgPSBjcmVhdGVJbnN0YW5jZVxuICAgICAgICAgICAgICAgICAgICA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoY29tcG9uZW50VGFnKVxuICAgICAgICAgICAgICAgICAgICA6IG51bGw7XG4gICAgICAgICAgICAgICAgICAvLyBjb25zdCBjb21wb25lbnRJbnN0YW5jZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICByZXNvbHZlKHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3I6IGNvbXBvbmVudFRhZyxcbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50SW5zdGFuY2VcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50c0xvYWRpbmcuZGVsZXRlKGNvbXBvbmVudFRhZyk7XG4gICAgICAgICAgICAgICAgICB0aGlzLmNvbXBvbmVudHNUb0xvYWQuZGVsZXRlKGNvbXBvbmVudFRhZyk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudHNMb2FkaW5nLmRlbGV0ZShjb21wb25lbnRUYWcpO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50c0xvYWRpbmcuZGVsZXRlKGNvbXBvbmVudFRhZyk7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmVsZW1lbnRzTG9hZGluZy5zZXQoY29tcG9uZW50VGFnLCBsb2FkUHJvbWlzZSk7XG4gICAgICByZXR1cm4gbG9hZFByb21pc2U7XG4gICAgfSBlbHNlIGlmICh0aGlzLmxvYWRlZENtcHMuaGFzKGNvbXBvbmVudFRhZykpIHtcbiAgICAgIC8vIGNvbXBvbmVudCBhbHJlYWR5IGxvYWRlZFxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICByZXNvbHZlKHtcbiAgICAgICAgICBzZWxlY3RvcjogY29tcG9uZW50VGFnLFxuICAgICAgICAgIGNvbXBvbmVudEluc3RhbmNlOiBjcmVhdGVJbnN0YW5jZVxuICAgICAgICAgICAgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGNvbXBvbmVudFRhZylcbiAgICAgICAgICAgIDogbnVsbFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBVbnJlY29nbml6ZWQgY29tcG9uZW50IFwiJHtjb21wb25lbnRUYWd9XCIuIE1ha2Ugc3VyZSBpdCBpcyByZWdpc3RlcmVkIGluIHRoZSBjb21wb25lbnQgcmVnaXN0cnlgXG4gICAgICApO1xuICAgIH1cbiAgfVxufVxuIl19