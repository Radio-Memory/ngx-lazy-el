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
    /** @nocollapse */ static { this.ɵfac = function LazyLoadDirective_Factory(t) { return new (t || LazyLoadDirective)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i1.ComponentLoaderService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i0.ViewContainerRef), i0.ɵɵdirectiveInject(i0.TemplateRef)); }; }
    /** @nocollapse */ static { this.ɵdir = /** @pureOrBreakMyCode */ i0.ɵɵdefineDirective({ type: LazyLoadDirective, selectors: [["", "ngxLazyEl", ""]], outputs: { loaded: "loaded" } }); }
}
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LazyLoadDirective, [{
        type: Directive,
        args: [{
                selector: '[ngxLazyEl]'
            }]
    }], function () { return [{ type: i0.ElementRef }, { type: i1.ComponentLoaderService }, { type: i0.ChangeDetectorRef }, { type: i0.ViewContainerRef }, { type: i0.TemplateRef }]; }, { loaded: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF6eS1sb2FkLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LWxhenktZWwvc3JjL2xpYi9sYXp5LWxvYWQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFHWixNQUFNLEVBQ04saUJBQWlCLEVBQ2pCLGdCQUFnQixFQUNoQixXQUFXLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7OztBQU1wRSxNQUFNLE9BQU8saUJBQWlCO0lBSTVCLFlBQ1UsVUFBc0IsRUFDdEIsZUFBdUMsRUFDdkMsRUFBcUIsRUFDckIsR0FBcUIsRUFDckIsUUFBMEI7UUFKMUIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixvQkFBZSxHQUFmLGVBQWUsQ0FBd0I7UUFDdkMsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFDckIsUUFBRyxHQUFILEdBQUcsQ0FBa0I7UUFDckIsYUFBUSxHQUFSLFFBQVEsQ0FBa0I7UUFScEMsZ0RBQWdEO1FBQ3RDLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBc0IsQ0FBQztJQVF2RCxDQUFDO0lBRUosUUFBUTtRQUNOLElBQUksUUFBa0IsQ0FBQyxDQUFDLG9CQUFvQjtRQUU1QyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2IsNENBQTRDO1lBRTVDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDdEQsSUFBSSxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUM3QywrRUFBK0U7Z0JBQy9FLFNBQVM7Z0JBQ1QsUUFBUSxHQUFHLENBQUMsR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUNyRCxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUN4QixDQUFDO2FBQ0g7aUJBQU07Z0JBQ0wsUUFBUSxHQUFHLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQzthQUMxRDtTQUNGO1FBRUQsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNiLE1BQU0sSUFBSSxLQUFLLENBQ2IseUlBQXlJLENBQzFJLENBQUM7U0FDSDtRQUVELElBQUksQ0FBQyxlQUFlO1lBQ2xCLDhEQUE4RDthQUM3RCwyQkFBMkIsQ0FBQyxRQUFRLENBQUM7YUFDckMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDakIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFM0MsNkJBQTZCO1lBQzdCLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQztZQUN2QixJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLGFBQWEsRUFBRTtnQkFDL0MsV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQ3JFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQ3JCLENBQUM7YUFDSDtZQUVELElBQUksQ0FBQyxxQkFBcUIsQ0FBQztnQkFDekIsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JCLGlCQUFpQixFQUFFLFdBQVc7YUFDL0IsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU8sU0FBUztRQUNmLE9BQVEsSUFBSSxDQUFDLFFBQWdCLENBQUMsc0JBQXNCLENBQUM7SUFDdkQsQ0FBQztJQUVPLHFCQUFxQixDQUFDLFNBQTZCO1FBQ3pELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2YsUUFBUSxFQUFFLFNBQVMsQ0FBQyxRQUFRO1lBQzVCLGlCQUFpQixFQUFFLFNBQVMsQ0FBQyxpQkFBaUI7U0FDL0MsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFdBQVc7UUFDVCxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDckMsQ0FBQztxR0F2RVUsaUJBQWlCO21HQUFqQixpQkFBaUI7O3VGQUFqQixpQkFBaUI7Y0FIN0IsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxhQUFhO2FBQ3hCOzJMQUdXLE1BQU07a0JBQWYsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgVGVtcGxhdGVSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21wb25lbnRMb2FkZXJTZXJ2aWNlIH0gZnJvbSAnLi9jb21wb25lbnQtbG9hZGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgTGF6eUNtcExvYWRlZEV2ZW50IH0gZnJvbSAnLi9sYXp5LWNtcC1sb2FkZWQtZXZlbnQnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbmd4TGF6eUVsXSdcbn0pXG5leHBvcnQgY2xhc3MgTGF6eUxvYWREaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIC8vIEBJbnB1dCgpIG5neExhenlFbDogc3RyaW5nW10gfCBzdHJpbmcgfCBudWxsO1xuICBAT3V0cHV0KCkgbG9hZGVkID0gbmV3IEV2ZW50RW1pdHRlcjxMYXp5Q21wTG9hZGVkRXZlbnQ+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgY29tcG9uZW50TG9hZGVyOiBDb21wb25lbnRMb2FkZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgdmNyOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIHByaXZhdGUgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT5cbiAgKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGxldCBub2RlVGFnczogc3RyaW5nW107IC8vID0gdGhpcy5uZ3hMYXp5RWw7XG5cbiAgICBpZiAoIW5vZGVUYWdzKSB7XG4gICAgICAvLyB0cnkgdG8gYXV0b21hdGljYWxseSBpbmZlciB0aGUgZWxlbWVtZW50c1xuXG4gICAgICBjb25zdCB0ZW1wbGF0ZSA9IHRoaXMudGVtcGxhdGUuY3JlYXRlRW1iZWRkZWRWaWV3KHt9KTtcbiAgICAgIGlmICh0ZW1wbGF0ZS5yb290Tm9kZXNbMF0uY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICAvLyB3ZSBwcm9iYWJseSBoYXZlIGEgY29udGFpbmVyIHdpdGggZWxlbWVudHMgaW4gaXQsIHNvIHRyeSB0byBsb2FkIGFsbCBvZiB0aGVtXG4gICAgICAgIC8vIGxhemlseVxuICAgICAgICBub2RlVGFncyA9IFsuLi50ZW1wbGF0ZS5yb290Tm9kZXNbMF0uY2hpbGRyZW5dLm1hcCh4ID0+XG4gICAgICAgICAgeC50YWdOYW1lLnRvTG93ZXJDYXNlKClcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5vZGVUYWdzID0gW3RlbXBsYXRlLnJvb3ROb2Rlc1swXS50YWdOYW1lLnRvTG93ZXJDYXNlKCldO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghbm9kZVRhZ3MpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYFVuYWJsZSB0byBhdXRvbWF0aWNhbGx5IGRldGVybWluZSB0aGUgZHluYW1pYyBlbGVtZW50IHNlbGVjdG9ycy4gQWx0ZXJuYXRpdmVseSB5b3UgY2FuIHBhc3MgdGhlbSBpbiB2aWEgdGhlICpuZ3hMYXp5RWw9XCJbJ215LWxhenktZWwnXVwiYFxuICAgICAgKTtcbiAgICB9XG5cbiAgICB0aGlzLmNvbXBvbmVudExvYWRlclxuICAgICAgLy8gLmxvYWRDb250YWluZWRDdXN0b21FbGVtZW50cyh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudClcbiAgICAgIC5sb2FkQ29udGFpbmVkQ3VzdG9tRWxlbWVudHMobm9kZVRhZ3MpXG4gICAgICAuc3Vic2NyaWJlKGVsZW1lbnRzID0+IHtcbiAgICAgICAgdGhpcy52Y3IuY2xlYXIoKTtcbiAgICAgICAgdGhpcy52Y3IuY3JlYXRlRW1iZWRkZWRWaWV3KHRoaXMudGVtcGxhdGUpO1xuXG4gICAgICAgIC8vIHRyeSB0byBnZXQgdGhlIGVsZW1lbnQgRE9NXG4gICAgICAgIGxldCBkb21JbnN0YW5jZSA9IG51bGw7XG4gICAgICAgIGlmICh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50KSB7XG4gICAgICAgICAgZG9tSW5zdGFuY2UgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICBlbGVtZW50c1swXS5zZWxlY3RvclxuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm5vdGlmeUNvbXBvbmVudExvYWRlZCh7XG4gICAgICAgICAgc2VsZWN0b3I6IG5vZGVUYWdzWzBdLFxuICAgICAgICAgIGNvbXBvbmVudEluc3RhbmNlOiBkb21JbnN0YW5jZVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBpc0l2eU1vZGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICh0aGlzLnRlbXBsYXRlIGFzIGFueSkuX2RlY2xhcmF0aW9uVENvbnRhaW5lcjtcbiAgfVxuXG4gIHByaXZhdGUgbm90aWZ5Q29tcG9uZW50TG9hZGVkKGxhenlDbXBFdjogTGF6eUNtcExvYWRlZEV2ZW50KSB7XG4gICAgdGhpcy5sb2FkZWQuZW1pdCh7XG4gICAgICBzZWxlY3RvcjogbGF6eUNtcEV2LnNlbGVjdG9yLFxuICAgICAgY29tcG9uZW50SW5zdGFuY2U6IGxhenlDbXBFdi5jb21wb25lbnRJbnN0YW5jZVxuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgY29uc29sZS5sb2coJ2xhenkgbG9hZCBkZXN0cm95ZWQnKTtcbiAgfVxufVxuIl19