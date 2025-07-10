import {
  Injectable,
  Injector,
  Inject,
  NgModuleRef,
  Compiler
} from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { LazyComponentDef, LAZY_CMPS_PATH_TOKEN } from './tokens';
import { Observable, of, from } from 'rxjs';
import { LazyCmpLoadedEvent } from './lazy-cmp-loaded-event';
import { LoadChildrenCallback } from '@angular/router';

interface LazyModule {
  customElementComponent: any;
}

@Injectable({
  providedIn: 'root'
})
export class ComponentLoaderService {
  private componentsToLoad: Map<string, LazyComponentDef>;
  private loadedCmps = new Map<string, NgModuleRef<any>>();
  private elementsLoading = new Map<string, Promise<LazyCmpLoadedEvent>>();

  constructor(
    private injector: Injector,
    private compiler: Compiler,
    @Inject(LAZY_CMPS_PATH_TOKEN)
    elementModulePaths: {
      selector: string;
      loadChildren: LoadChildrenCallback;
    }[]
  ) {
    const ELEMENT_MODULE_PATHS = new Map<string, any>();
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

  loadContainedCustomElements(
    tags: string[]
  ): Observable<LazyCmpLoadedEvent[]> {
    const unregisteredSelectors = Array.from(
      this.componentsToLoad.keys()
    ).filter(s => tags.find(x => x.toLowerCase() === s.toLowerCase()));

    // already registered elements
    const alreadyRegistered = Array.from(this.loadedCmps.keys()).filter(s =>
      tags.find(x => x.toLowerCase() === s.toLowerCase())
    );

    // add the already registered in...elements won't be recreated
    // the "loadComponent(...)"
    unregisteredSelectors.push(...alreadyRegistered);

    // Returns observable that completes when all discovered elements have been registered.
    const allRegistered = Promise.all(
      unregisteredSelectors.map(s => this.loadComponent(s, false))
    );
    return from(allRegistered);
  }

  /**
   * Allows to lazy load a component given it's selector (i.e. tagname).
   * If the component selector has been registered, it's according module
   * will be fetched lazily
   * @param componentTag selector of the component to load
   * @param createInstance if true, creates an element and returns it in the promise
   */
  async loadComponent(
    componentTag: string,
    createInstance = true
  ): Promise<LazyCmpLoadedEvent> {
    if (this.elementsLoading.has(componentTag)) {
      return this.elementsLoading.get(componentTag);
    }

    if (this.componentsToLoad.has(componentTag)) {
      const cmpRegistryEntry = this.componentsToLoad.get(componentTag);
      const path = cmpRegistryEntry.loadChildren;

      const loadPromise = new Promise<LazyCmpLoadedEvent>(async (resolve, reject) => {
        try {
          const elementModule = await (path() as Promise<any>);
          const moduleFactory = this.compiler.compileModuleSync(elementModule);
          const moduleRef = moduleFactory.create(this.injector);
          const lazyModuleInstance = moduleRef.instance as LazyModule;
          let customElementComponent;

          if (typeof lazyModuleInstance.customElementComponent === 'object') {
            customElementComponent =
              lazyModuleInstance.customElementComponent[componentTag];
            if (!customElementComponent) {
              throw `You specified multiple component elements in module ${elementModule} but there was no match for tag ${componentTag} in ${JSON.stringify(
                lazyModuleInstance.customElementComponent
              )}. Make sure the selector in the module is aligned with the one specified in the lazy module definition.`;
            }
          } else {
            customElementComponent = lazyModuleInstance.customElementComponent;
          }

          const CustomElement = createCustomElement(customElementComponent, {
            injector: this.injector
          });

          customElements!.define(componentTag, CustomElement);
          await customElements.whenDefined(componentTag);

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
        } catch (err) {
          this.elementsLoading.delete(componentTag);
          reject(err);
        }
      });

      this.elementsLoading.set(componentTag, loadPromise);
      return loadPromise;
    } else if (this.loadedCmps.has(componentTag)) {
      return new Promise(resolve => {
        resolve({
          selector: componentTag,
          componentInstance: createInstance
            ? document.createElement(componentTag)
            : null
        });
      });
    } else {
      throw new Error(
        `Unrecognized component "${componentTag}". Make sure it is registered in the component registry`
      );
    }
  }
}
