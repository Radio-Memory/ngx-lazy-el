import { Injectable, Injector, Inject, createNgModule } from '@angular/core';
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
                    .then(async (elementModuleOrType) => {
                    try {
                        const elementModuleRef = createNgModule(elementModuleOrType, this.injector);
                        const moduleInstance = elementModuleRef.instance;
                        let customElementComponent;
                        if (typeof moduleInstance.customElementComponent === 'object') {
                            customElementComponent = moduleInstance.customElementComponent[componentTag];
                            if (!customElementComponent) {
                                throw `You specified multiple component elements in module ${elementModuleRef.instance.constructor.name} but there was no match for tag ${componentTag}.`;
                            }
                        }
                        else {
                            customElementComponent = moduleInstance.customElementComponent;
                        }
                        if (!customElementComponent) {
                            throw new Error(`Could not find a customElementComponent property in the lazy-loaded module for selector "${componentTag}".`);
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
                            this.loadedCmps.set(componentTag, elementModuleRef);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LWxvYWRlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbGF6eS1lbC9zcmMvbGliL2NvbXBvbmVudC1sb2FkZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsVUFBVSxFQUNWLFFBQVEsRUFDUixNQUFNLEVBRU4sY0FBYyxFQUVmLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3hELE9BQU8sRUFBb0Isb0JBQW9CLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDbEUsT0FBTyxFQUFrQixJQUFJLEVBQUUsTUFBTSxNQUFNLENBQUM7O0FBTzVDLE1BQU0sT0FBTyxzQkFBc0I7SUFLakMsWUFDVSxRQUFrQixFQUUxQixrQkFHRztRQUxLLGFBQVEsR0FBUixRQUFRLENBQVU7UUFKcEIsZUFBVSxHQUFHLElBQUksR0FBRyxFQUE0QixDQUFDO1FBQ2pELG9CQUFlLEdBQUcsSUFBSSxHQUFHLEVBQXVDLENBQUM7UUFVdkUsTUFBTSxvQkFBb0IsR0FBRyxJQUFJLEdBQUcsRUFBZSxDQUFDO1FBQ3BELGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNqQyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNsRCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxvQkFBb0IsQ0FBQztJQUMvQyxDQUFDO0lBRUQsbUJBQW1CO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3RDLENBQUM7SUFFRDs7T0FFRztJQUNILCtCQUErQjtJQUMvQix5QkFBeUI7SUFDekIsd0NBQXdDO0lBQ3hDLDhDQUE4QztJQUM5QyxtQ0FBbUM7SUFDbkMsNkNB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O3NCQVFJLE1BQU07dUJBQUMsb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgSW5qZWN0YWJsZSxcbiAgSW5qZWN0b3IsXG4gIEluamVjdCxcbiAgTmdNb2R1bGVSZWYsXG4gIGNyZWF0ZU5nTW9kdWxlLFxuICBUeXBlXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgY3JlYXRlQ3VzdG9tRWxlbWVudCB9IGZyb20gJ0Bhbmd1bGFyL2VsZW1lbnRzJztcbmltcG9ydCB7IExhenlDb21wb25lbnREZWYsIExBWllfQ01QU19QQVRIX1RPS0VOIH0gZnJvbSAnLi90b2tlbnMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YsIGZyb20gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IExhenlDbXBMb2FkZWRFdmVudCB9IGZyb20gJy4vbGF6eS1jbXAtbG9hZGVkLWV2ZW50JztcbmltcG9ydCB7IExvYWRDaGlsZHJlbkNhbGxiYWNrIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQ29tcG9uZW50TG9hZGVyU2VydmljZSB7XG4gIHByaXZhdGUgY29tcG9uZW50c1RvTG9hZDogTWFwPHN0cmluZywgTGF6eUNvbXBvbmVudERlZj47XG4gIHByaXZhdGUgbG9hZGVkQ21wcyA9IG5ldyBNYXA8c3RyaW5nLCBOZ01vZHVsZVJlZjxhbnk+PigpO1xuICBwcml2YXRlIGVsZW1lbnRzTG9hZGluZyA9IG5ldyBNYXA8c3RyaW5nLCBQcm9taXNlPExhenlDbXBMb2FkZWRFdmVudD4+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgQEluamVjdChMQVpZX0NNUFNfUEFUSF9UT0tFTilcbiAgICBlbGVtZW50TW9kdWxlUGF0aHM6IHtcbiAgICAgIHNlbGVjdG9yOiBzdHJpbmc7XG4gICAgICBsb2FkQ2hpbGRyZW46IExvYWRDaGlsZHJlbkNhbGxiYWNrO1xuICAgIH1bXVxuICApIHtcbiAgICBjb25zdCBFTEVNRU5UX01PRFVMRV9QQVRIUyA9IG5ldyBNYXA8c3RyaW5nLCBhbnk+KCk7XG4gICAgZWxlbWVudE1vZHVsZVBhdGhzLmZvckVhY2gocm91dGUgPT4ge1xuICAgICAgRUxFTUVOVF9NT0RVTEVfUEFUSFMuc2V0KHJvdXRlLnNlbGVjdG9yLCByb3V0ZSk7XG4gICAgfSk7XG4gICAgdGhpcy5jb21wb25lbnRzVG9Mb2FkID0gRUxFTUVOVF9NT0RVTEVfUEFUSFM7XG4gIH1cblxuICBnZXRDb21wb25lbnRzVG9Mb2FkKCkge1xuICAgIHJldHVybiB0aGlzLmNvbXBvbmVudHNUb0xvYWQua2V5cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhlYXZpbHkgaW5zcGlyZWQgYnkgdGhlIEFuZ3VsYXIgZWxlbWVudHMgbG9hZGVyIG9uIHRoZSBvZmZpY2lhbCByZXBvXG4gICAqL1xuICAvLyBsb2FkQ29udGFpbmVkQ3VzdG9tRWxlbWVudHMoXG4gIC8vICAgZWxlbWVudDogSFRNTEVsZW1lbnRcbiAgLy8gKTogT2JzZXJ2YWJsZTxMYXp5Q21wTG9hZGVkRXZlbnRbXT4ge1xuICAvLyAgIGNvbnN0IHVucmVnaXN0ZXJlZFNlbGVjdG9ycyA9IEFycmF5LmZyb20oXG4gIC8vICAgICB0aGlzLmNvbXBvbmVudHNUb0xvYWQua2V5cygpXG4gIC8vICAgKS5maWx0ZXIocyA9PiBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IocykpO1xuXG4gIC8vICAgLy8gYWxyZWFkeSByZWdpc3RlcmVkIGVsZW1lbnRzXG4gIC8vICAgY29uc3QgYWxyZWFkeVJlZ2lzdGVyZWQgPSBBcnJheS5mcm9tKHRoaXMubG9hZGVkQ21wcy5rZXlzKCkpLmZpbHRlcihzID0+XG4gIC8vICAgICBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IocylcbiAgLy8gICApO1xuXG4gIC8vICAgLy8gYWRkIHRoZSBhbHJlYWR5IHJlZ2lzdGVyZWQgaW4uLi5lbGVtZW50cyB3b24ndCBiZSByZWNyZWF0ZWRcbiAgLy8gICAvLyB0aGUgXCJsb2FkQ29tcG9uZW50KC4uLilcIlxuICAvLyAgIHVucmVnaXN0ZXJlZFNlbGVjdG9ycy5wdXNoKC4uLmFscmVhZHlSZWdpc3RlcmVkKTtcblxuICAvLyAgIC8vIFJldHVybnMgb2JzZXJ2YWJsZSB0aGF0IGNvbXBsZXRlcyB3aGVuIGFsbCBkaXNjb3ZlcmVkIGVsZW1lbnRzIGhhdmUgYmVlbiByZWdpc3RlcmVkLlxuICAvLyAgIGNvbnN0IGFsbFJlZ2lzdGVyZWQgPSBQcm9taXNlLmFsbChcbiAgLy8gICAgIHVucmVnaXN0ZXJlZFNlbGVjdG9ycy5tYXAoYXN5bmMgcyA9PiB7XG4gIC8vICAgICAgIC8vIGVsZW1lbnQucXVlcnlTZWxlY3RvcihzKS5yZW1vdmUoKTtcbiAgLy8gICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5sb2FkQ29tcG9uZW50KHMsIHRydWUpO1xuICAvLyAgICAgICByZXR1cm4gcmVzdWx0O1xuICAvLyAgICAgfSlcbiAgLy8gICApO1xuICAvLyAgIHJldHVybiBmcm9tKGFsbFJlZ2lzdGVyZWQpO1xuICAvLyB9XG5cbiAgbG9hZENvbnRhaW5lZEN1c3RvbUVsZW1lbnRzKFxuICAgIHRhZ3M6IHN0cmluZ1tdXG4gICk6IE9ic2VydmFibGU8TGF6eUNtcExvYWRlZEV2ZW50W10+IHtcbiAgICBjb25zdCB1bnJlZ2lzdGVyZWRTZWxlY3RvcnMgPSBBcnJheS5mcm9tKFxuICAgICAgdGhpcy5jb21wb25lbnRzVG9Mb2FkLmtleXMoKVxuICAgICkuZmlsdGVyKHMgPT4gdGFncy5maW5kKHggPT4geC50b0xvd2VyQ2FzZSgpID09PSBzLnRvTG93ZXJDYXNlKCkpKTtcblxuICAgIC8vIGFscmVhZHkgcmVnaXN0ZXJlZCBlbGVtZW50c1xuICAgIGNvbnN0IGFscmVhZHlSZWdpc3RlcmVkID0gQXJyYXkuZnJvbSh0aGlzLmxvYWRlZENtcHMua2V5cygpKS5maWx0ZXIocyA9PlxuICAgICAgdGFncy5maW5kKHggPT4geC50b0xvd2VyQ2FzZSgpID09PSBzLnRvTG93ZXJDYXNlKCkpXG4gICAgKTtcblxuICAgIC8vIGFkZCB0aGUgYWxyZWFkeSByZWdpc3RlcmVkIGluLi4uZWxlbWVudHMgd29uJ3QgYmUgcmVjcmVhdGVkXG4gICAgLy8gdGhlIFwibG9hZENvbXBvbmVudCguLi4pXCJcbiAgICB1bnJlZ2lzdGVyZWRTZWxlY3RvcnMucHVzaCguLi5hbHJlYWR5UmVnaXN0ZXJlZCk7XG5cbiAgICAvLyBSZXR1cm5zIG9ic2VydmFibGUgdGhhdCBjb21wbGV0ZXMgd2hlbiBhbGwgZGlzY292ZXJlZCBlbGVtZW50cyBoYXZlIGJlZW4gcmVnaXN0ZXJlZC5cbiAgICBjb25zdCBhbGxSZWdpc3RlcmVkID0gUHJvbWlzZS5hbGwoXG4gICAgICB1bnJlZ2lzdGVyZWRTZWxlY3RvcnMubWFwKHMgPT4gdGhpcy5sb2FkQ29tcG9uZW50KHMsIGZhbHNlKSlcbiAgICApO1xuICAgIHJldHVybiBmcm9tKGFsbFJlZ2lzdGVyZWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFsbG93cyB0byBsYXp5IGxvYWQgYSBjb21wb25lbnQgZ2l2ZW4gaXQncyBzZWxlY3RvciAoaS5lLiB0YWduYW1lKS5cbiAgICogSWYgdGhlIGNvbXBvbmVudCBzZWxlY3RvciBoYXMgYmVlbiByZWdpc3RlcmVkLCBpdCdzIGFjY29yZGluZyBtb2R1bGVcbiAgICogd2lsbCBiZSBmZXRjaGVkIGxhemlseVxuICAgKiBAcGFyYW0gY29tcG9uZW50VGFnIHNlbGVjdG9yIG9mIHRoZSBjb21wb25lbnQgdG8gbG9hZFxuICAgKiBAcGFyYW0gY3JlYXRlSW5zdGFuY2UgaWYgdHJ1ZSwgY3JlYXRlcyBhbiBlbGVtZW50IGFuZCByZXR1cm5zIGl0IGluIHRoZSBwcm9taXNlXG4gICAqL1xuICBsb2FkQ29tcG9uZW50KFxuICAgIGNvbXBvbmVudFRhZzogc3RyaW5nLFxuICAgIGNyZWF0ZUluc3RhbmNlID0gdHJ1ZVxuICApOiBQcm9taXNlPExhenlDbXBMb2FkZWRFdmVudD4ge1xuICAgIGlmICh0aGlzLmVsZW1lbnRzTG9hZGluZy5oYXMoY29tcG9uZW50VGFnKSkge1xuICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudHNMb2FkaW5nLmdldChjb21wb25lbnRUYWcpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmNvbXBvbmVudHNUb0xvYWQuaGFzKGNvbXBvbmVudFRhZykpIHtcbiAgICAgIGNvbnN0IGNtcFJlZ2lzdHJ5RW50cnkgPSB0aGlzLmNvbXBvbmVudHNUb0xvYWQuZ2V0KGNvbXBvbmVudFRhZyk7XG5cbiAgICAgIGNvbnN0IHBhdGggPSBjbXBSZWdpc3RyeUVudHJ5LmxvYWRDaGlsZHJlbjtcblxuICAgICAgICAgICAgY29uc3QgbG9hZFByb21pc2UgPSBuZXcgUHJvbWlzZTxMYXp5Q21wTG9hZGVkRXZlbnQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgKHBhdGgoKSBhcyBQcm9taXNlPGFueT4pXG4gICAgICAgICAgLnRoZW4oYXN5bmMgKGVsZW1lbnRNb2R1bGVPclR5cGUpID0+IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnRNb2R1bGVSZWYgPSBjcmVhdGVOZ01vZHVsZShlbGVtZW50TW9kdWxlT3JUeXBlLCB0aGlzLmluamVjdG9yKTtcbiAgICAgICAgICAgICAgY29uc3QgbW9kdWxlSW5zdGFuY2UgPSBlbGVtZW50TW9kdWxlUmVmLmluc3RhbmNlIGFzIGFueTtcbiAgICAgICAgICAgICAgbGV0IGN1c3RvbUVsZW1lbnRDb21wb25lbnQ7XG5cbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiBtb2R1bGVJbnN0YW5jZS5jdXN0b21FbGVtZW50Q29tcG9uZW50ID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIGN1c3RvbUVsZW1lbnRDb21wb25lbnQgPSBtb2R1bGVJbnN0YW5jZS5jdXN0b21FbGVtZW50Q29tcG9uZW50W2NvbXBvbmVudFRhZ107XG4gICAgICAgICAgICAgICAgaWYgKCFjdXN0b21FbGVtZW50Q29tcG9uZW50KSB7XG4gICAgICAgICAgICAgICAgICB0aHJvdyBgWW91IHNwZWNpZmllZCBtdWx0aXBsZSBjb21wb25lbnQgZWxlbWVudHMgaW4gbW9kdWxlICR7ZWxlbWVudE1vZHVsZVJlZi5pbnN0YW5jZS5jb25zdHJ1Y3Rvci5uYW1lfSBidXQgdGhlcmUgd2FzIG5vIG1hdGNoIGZvciB0YWcgJHtjb21wb25lbnRUYWd9LmA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGN1c3RvbUVsZW1lbnRDb21wb25lbnQgPSBtb2R1bGVJbnN0YW5jZS5jdXN0b21FbGVtZW50Q29tcG9uZW50O1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaWYgKCFjdXN0b21FbGVtZW50Q29tcG9uZW50KSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDb3VsZCBub3QgZmluZCBhIGN1c3RvbUVsZW1lbnRDb21wb25lbnQgcHJvcGVydHkgaW4gdGhlIGxhenktbG9hZGVkIG1vZHVsZSBmb3Igc2VsZWN0b3IgXCIke2NvbXBvbmVudFRhZ31cIi5gKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGNvbnN0IEN1c3RvbUVsZW1lbnQgPSBjcmVhdGVDdXN0b21FbGVtZW50KGN1c3RvbUVsZW1lbnRDb21wb25lbnQsIHtcbiAgICAgICAgICAgICAgICBpbmplY3RvcjogdGhpcy5pbmplY3RvclxuICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAvLyBkZWZpbmUgdGhlIEFuZ3VsYXIgRWxlbWVudFxuICAgICAgICAgICAgICBjdXN0b21FbGVtZW50cyEuZGVmaW5lKGNvbXBvbmVudFRhZywgQ3VzdG9tRWxlbWVudCk7XG4gICAgICAgICAgICAgIGN1c3RvbUVsZW1lbnRzXG4gICAgICAgICAgICAgICAgLndoZW5EZWZpbmVkKGNvbXBvbmVudFRhZylcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAvLyByZW1lbWJlciBmb3IgbmV4dCB0aW1lXG4gICAgICAgICAgICAgICAgICB0aGlzLmxvYWRlZENtcHMuc2V0KGNvbXBvbmVudFRhZywgZWxlbWVudE1vZHVsZVJlZik7XG4gICAgICAgICAgICAgICAgICAvLyBpbnN0YW50aWF0ZSB0aGUgY29tcG9uZW50XG4gICAgICAgICAgICAgICAgICBjb25zdCBjb21wb25lbnRJbnN0YW5jZSA9IGNyZWF0ZUluc3RhbmNlXG4gICAgICAgICAgICAgICAgICAgID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChjb21wb25lbnRUYWcpXG4gICAgICAgICAgICAgICAgICAgIDogbnVsbDtcbiAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IGNvbXBvbmVudEluc3RhbmNlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgIHJlc29sdmUoe1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RvcjogY29tcG9uZW50VGFnLFxuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRJbnN0YW5jZVxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRzTG9hZGluZy5kZWxldGUoY29tcG9uZW50VGFnKTtcbiAgICAgICAgICAgICAgICAgIHRoaXMuY29tcG9uZW50c1RvTG9hZC5kZWxldGUoY29tcG9uZW50VGFnKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50c0xvYWRpbmcuZGVsZXRlKGNvbXBvbmVudFRhZyk7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRzTG9hZGluZy5kZWxldGUoY29tcG9uZW50VGFnKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuZWxlbWVudHNMb2FkaW5nLnNldChjb21wb25lbnRUYWcsIGxvYWRQcm9taXNlKTtcbiAgICAgIHJldHVybiBsb2FkUHJvbWlzZTtcbiAgICB9IGVsc2UgaWYgKHRoaXMubG9hZGVkQ21wcy5oYXMoY29tcG9uZW50VGFnKSkge1xuICAgICAgLy8gY29tcG9uZW50IGFscmVhZHkgbG9hZGVkXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgIHJlc29sdmUoe1xuICAgICAgICAgIHNlbGVjdG9yOiBjb21wb25lbnRUYWcsXG4gICAgICAgICAgY29tcG9uZW50SW5zdGFuY2U6IGNyZWF0ZUluc3RhbmNlXG4gICAgICAgICAgICA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoY29tcG9uZW50VGFnKVxuICAgICAgICAgICAgOiBudWxsXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYFVucmVjb2duaXplZCBjb21wb25lbnQgXCIke2NvbXBvbmVudFRhZ31cIi4gTWFrZSBzdXJlIGl0IGlzIHJlZ2lzdGVyZWQgaW4gdGhlIGNvbXBvbmVudCByZWdpc3RyeWBcbiAgICAgICk7XG4gICAgfVxuICB9XG59XG4iXX0=