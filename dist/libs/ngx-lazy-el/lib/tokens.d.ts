import { InjectionToken } from '@angular/core';
import { LoadChildrenCallback } from '@angular/router';
/** Injection token to provide the element path modules. */
export declare const LAZY_CMPS_PATH_TOKEN: InjectionToken<unknown>;
export interface LazyComponentDef {
    selector: string;
    loadChildren: LoadChildrenCallback;
}
