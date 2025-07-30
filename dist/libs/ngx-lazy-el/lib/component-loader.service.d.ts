import { Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { LazyCmpLoadedEvent } from './lazy-cmp-loaded-event';
import { LoadChildrenCallback } from '@angular/router';
import * as i0 from "@angular/core";
export declare class ComponentLoaderService {
    private injector;
    private componentsToLoad;
    private loadedCmps;
    private elementsLoading;
    constructor(injector: Injector, elementModulePaths: {
        selector: string;
        loadChildren: LoadChildrenCallback;
    }[]);
    getComponentsToLoad(): IterableIterator<string>;
    /**
     * Heavily inspired by the Angular elements loader on the official repo
     */
    loadContainedCustomElements(tags: string[]): Observable<LazyCmpLoadedEvent[]>;
    /**
     * Allows to lazy load a component given it's selector (i.e. tagname).
     * If the component selector has been registered, it's according module
     * will be fetched lazily
     * @param componentTag selector of the component to load
     * @param createInstance if true, creates an element and returns it in the promise
     */
    loadComponent(componentTag: string, createInstance?: boolean): Promise<LazyCmpLoadedEvent>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ComponentLoaderService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ComponentLoaderService>;
}
