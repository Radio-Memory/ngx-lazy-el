import { ElementRef, EventEmitter, OnDestroy, OnInit, ChangeDetectorRef, ViewContainerRef, TemplateRef } from '@angular/core';
import { ComponentLoaderService } from './component-loader.service';
import { LazyCmpLoadedEvent } from './lazy-cmp-loaded-event';
import * as i0 from "@angular/core";
export declare class LazyLoadDirective implements OnInit, OnDestroy {
    private elementRef;
    private componentLoader;
    private cd;
    private vcr;
    private template;
    loaded: EventEmitter<LazyCmpLoadedEvent>;
    constructor(elementRef: ElementRef, componentLoader: ComponentLoaderService, cd: ChangeDetectorRef, vcr: ViewContainerRef, template: TemplateRef<any>);
    ngOnInit(): void;
    private isIvyMode;
    private notifyComponentLoaded;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<LazyLoadDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<LazyLoadDirective, "[ngxLazyEl]", never, {}, { "loaded": "loaded"; }, never, never, false, never>;
}
