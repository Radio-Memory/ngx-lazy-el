import { Directive, ElementRef, EventEmitter, Output, ChangeDetectorRef, ViewContainerRef, TemplateRef } from '@angular/core';
import { ComponentLoaderService } from './component-loader.service';
import * as i0 from "@angular/core";
import * as i1 from "./component-loader.service";
export class LazyLoadDirective {
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
}
/** @nocollapse */ LazyLoadDirective.ɵfac = function LazyLoadDirective_Factory(t) { return new (t || LazyLoadDirective)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i1.ComponentLoaderService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i0.ViewContainerRef), i0.ɵɵdirectiveInject(i0.TemplateRef)); };
/** @nocollapse */ LazyLoadDirective.ɵdir = i0.ɵɵdefineDirective({ type: LazyLoadDirective, selectors: [["", "ngxLazyEl", ""]], outputs: { loaded: "loaded" } });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(LazyLoadDirective, [{
        type: Directive,
        args: [{
                selector: '[ngxLazyEl]'
            }]
    }], function () { return [{ type: i0.ElementRef }, { type: i1.ComponentLoaderService }, { type: i0.ChangeDetectorRef }, { type: i0.ViewContainerRef }, { type: i0.TemplateRef }]; }, { loaded: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF6eS1sb2FkLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIvd29ya3NwYWNlL25neC1sYXp5LWVsL2xpYnMvbmd4LWxhenktZWwvc3JjLyIsInNvdXJjZXMiOlsibGliL2xhenktbG9hZC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUdaLE1BQU0sRUFDTixpQkFBaUIsRUFDakIsZ0JBQWdCLEVBQ2hCLFdBQVcsRUFLWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7O0FBTXBFLE1BQU0sT0FBTyxpQkFBaUI7SUFJNUIsWUFDVSxVQUFzQixFQUN0QixlQUF1QyxFQUN2QyxFQUFxQixFQUNyQixHQUFxQixFQUNyQixRQUEwQjtRQUoxQixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLG9CQUFlLEdBQWYsZUFBZSxDQUF3QjtRQUN2QyxPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQUNyQixRQUFHLEdBQUgsR0FBRyxDQUFrQjtRQUNyQixhQUFRLEdBQVIsUUFBUSxDQUFrQjtRQVJwQyxnREFBZ0Q7UUFDdEMsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFzQixDQUFDO0lBUXZELENBQUM7SUFFSixRQUFRO1FBQ04sSUFBSSxRQUFrQixDQUFDLENBQUMsb0JBQW9CO1FBRTVDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDYiw0Q0FBNEM7WUFFNUMsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN0RCxJQUFJLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQzdDLCtFQUErRTtnQkFDL0UsU0FBUztnQkFDVCxRQUFRLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQ3JELENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQ3hCLENBQUM7YUFDSDtpQkFBTTtnQkFDTCxRQUFRLEdBQUcsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO2FBQzFEO1NBQ0Y7UUFFRCxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2IsTUFBTSxJQUFJLEtBQUssQ0FDYix5SUFBeUksQ0FDMUksQ0FBQztTQUNIO1FBRUQsSUFBSSxDQUFDLGVBQWU7WUFDbEIsOERBQThEO2FBQzdELDJCQUEyQixDQUFDLFFBQVEsQ0FBQzthQUNyQyxTQUFTLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDcEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNqQixJQUFJLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUUzQyw2QkFBNkI7WUFDN0IsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsYUFBYSxFQUFFO2dCQUMvQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FDckUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FDckIsQ0FBQzthQUNIO1lBRUQsSUFBSSxDQUFDLHFCQUFxQixDQUFDO2dCQUN6QixRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDckIsaUJBQWlCLEVBQUUsV0FBVzthQUMvQixDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTyxTQUFTO1FBQ2YsT0FBUSxJQUFJLENBQUMsUUFBZ0IsQ0FBQyxzQkFBc0IsQ0FBQztJQUN2RCxDQUFDO0lBRU8scUJBQXFCLENBQUMsU0FBNkI7UUFDekQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDZixRQUFRLEVBQUUsU0FBUyxDQUFDLFFBQVE7WUFDNUIsaUJBQWlCLEVBQUUsU0FBUyxDQUFDLGlCQUFpQjtTQUMvQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsV0FBVztRQUNULE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQztJQUNyQyxDQUFDOztxR0F2RVUsaUJBQWlCO3lFQUFqQixpQkFBaUI7a0RBQWpCLGlCQUFpQjtjQUg3QixTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLGFBQWE7YUFDeEI7MkxBR1csTUFBTTtrQkFBZixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBUZW1wbGF0ZVJlZixcbiAgQ29udGVudENoaWxkLFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIEFmdGVyQ29udGVudEluaXQsXG4gIElucHV0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tcG9uZW50TG9hZGVyU2VydmljZSB9IGZyb20gJy4vY29tcG9uZW50LWxvYWRlci5zZXJ2aWNlJztcbmltcG9ydCB7IExhenlDbXBMb2FkZWRFdmVudCB9IGZyb20gJy4vbGF6eS1jbXAtbG9hZGVkLWV2ZW50JztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW25neExhenlFbF0nXG59KVxuZXhwb3J0IGNsYXNzIExhenlMb2FkRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAvLyBASW5wdXQoKSBuZ3hMYXp5RWw6IHN0cmluZ1tdIHwgc3RyaW5nIHwgbnVsbDtcbiAgQE91dHB1dCgpIGxvYWRlZCA9IG5ldyBFdmVudEVtaXR0ZXI8TGF6eUNtcExvYWRlZEV2ZW50PigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIGNvbXBvbmVudExvYWRlcjogQ29tcG9uZW50TG9hZGVyU2VydmljZSxcbiAgICBwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIHZjcjogVmlld0NvbnRhaW5lclJlZixcbiAgICBwcml2YXRlIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+XG4gICkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICBsZXQgbm9kZVRhZ3M6IHN0cmluZ1tdOyAvLyA9IHRoaXMubmd4TGF6eUVsO1xuXG4gICAgaWYgKCFub2RlVGFncykge1xuICAgICAgLy8gdHJ5IHRvIGF1dG9tYXRpY2FsbHkgaW5mZXIgdGhlIGVsZW1lbWVudHNcblxuICAgICAgY29uc3QgdGVtcGxhdGUgPSB0aGlzLnRlbXBsYXRlLmNyZWF0ZUVtYmVkZGVkVmlldyh7fSk7XG4gICAgICBpZiAodGVtcGxhdGUucm9vdE5vZGVzWzBdLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgLy8gd2UgcHJvYmFibHkgaGF2ZSBhIGNvbnRhaW5lciB3aXRoIGVsZW1lbnRzIGluIGl0LCBzbyB0cnkgdG8gbG9hZCBhbGwgb2YgdGhlbVxuICAgICAgICAvLyBsYXppbHlcbiAgICAgICAgbm9kZVRhZ3MgPSBbLi4udGVtcGxhdGUucm9vdE5vZGVzWzBdLmNoaWxkcmVuXS5tYXAoeCA9PlxuICAgICAgICAgIHgudGFnTmFtZS50b0xvd2VyQ2FzZSgpXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBub2RlVGFncyA9IFt0ZW1wbGF0ZS5yb290Tm9kZXNbMF0udGFnTmFtZS50b0xvd2VyQ2FzZSgpXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIW5vZGVUYWdzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBVbmFibGUgdG8gYXV0b21hdGljYWxseSBkZXRlcm1pbmUgdGhlIGR5bmFtaWMgZWxlbWVudCBzZWxlY3RvcnMuIEFsdGVybmF0aXZlbHkgeW91IGNhbiBwYXNzIHRoZW0gaW4gdmlhIHRoZSAqbmd4TGF6eUVsPVwiWydteS1sYXp5LWVsJ11cImBcbiAgICAgICk7XG4gICAgfVxuXG4gICAgdGhpcy5jb21wb25lbnRMb2FkZXJcbiAgICAgIC8vIC5sb2FkQ29udGFpbmVkQ3VzdG9tRWxlbWVudHModGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpXG4gICAgICAubG9hZENvbnRhaW5lZEN1c3RvbUVsZW1lbnRzKG5vZGVUYWdzKVxuICAgICAgLnN1YnNjcmliZShlbGVtZW50cyA9PiB7XG4gICAgICAgIHRoaXMudmNyLmNsZWFyKCk7XG4gICAgICAgIHRoaXMudmNyLmNyZWF0ZUVtYmVkZGVkVmlldyh0aGlzLnRlbXBsYXRlKTtcblxuICAgICAgICAvLyB0cnkgdG8gZ2V0IHRoZSBlbGVtZW50IERPTVxuICAgICAgICBsZXQgZG9tSW5zdGFuY2UgPSBudWxsO1xuICAgICAgICBpZiAodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudCkge1xuICAgICAgICAgIGRvbUluc3RhbmNlID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgZWxlbWVudHNbMF0uc2VsZWN0b3JcbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5ub3RpZnlDb21wb25lbnRMb2FkZWQoe1xuICAgICAgICAgIHNlbGVjdG9yOiBub2RlVGFnc1swXSxcbiAgICAgICAgICBjb21wb25lbnRJbnN0YW5jZTogZG9tSW5zdGFuY2VcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgaXNJdnlNb2RlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAodGhpcy50ZW1wbGF0ZSBhcyBhbnkpLl9kZWNsYXJhdGlvblRDb250YWluZXI7XG4gIH1cblxuICBwcml2YXRlIG5vdGlmeUNvbXBvbmVudExvYWRlZChsYXp5Q21wRXY6IExhenlDbXBMb2FkZWRFdmVudCkge1xuICAgIHRoaXMubG9hZGVkLmVtaXQoe1xuICAgICAgc2VsZWN0b3I6IGxhenlDbXBFdi5zZWxlY3RvcixcbiAgICAgIGNvbXBvbmVudEluc3RhbmNlOiBsYXp5Q21wRXYuY29tcG9uZW50SW5zdGFuY2VcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGNvbnNvbGUubG9nKCdsYXp5IGxvYWQgZGVzdHJveWVkJyk7XG4gIH1cbn1cbiJdfQ==