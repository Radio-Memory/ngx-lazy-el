import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LazyLoadDirective } from './lazy-load.directive';
import { LAZY_CMPS_PATH_TOKEN } from './tokens';
import * as i0 from "@angular/core";
export class NgxLazyElModule {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWxhenktZWwubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbGF6eS1lbC9zcmMvbGliL25neC1sYXp5LWVsLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUF1QixRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDMUQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sVUFBVSxDQUFDOztBQU9oRCxNQUFNLE9BQU8sZUFBZTtJQUMxQixNQUFNLENBQUMsT0FBTyxDQUFDLFdBQWtCO1FBQy9CLE9BQU87WUFDTCxRQUFRLEVBQUUsZUFBZTtZQUN6QixTQUFTLEVBQUU7Z0JBQ1Qsd0VBQXdFO2dCQUN4RTtvQkFDRSxPQUFPLEVBQUUsb0JBQW9CO29CQUM3QixRQUFRLEVBQUUsV0FBVztpQkFDdEI7YUFDRjtTQUNGLENBQUM7SUFDSixDQUFDO21HQVpVLGVBQWU7a0dBQWYsZUFBZTtzR0FKaEIsWUFBWTs7dUZBSVgsZUFBZTtjQUwzQixRQUFRO2VBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO2dCQUN2QixZQUFZLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztnQkFDakMsT0FBTyxFQUFFLENBQUMsaUJBQWlCLENBQUM7YUFDN0I7O3dGQUNZLGVBQWUsbUJBSFgsaUJBQWlCLGFBRHRCLFlBQVksYUFFWixpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IExhenlMb2FkRGlyZWN0aXZlIH0gZnJvbSAnLi9sYXp5LWxvYWQuZGlyZWN0aXZlJztcbmltcG9ydCB7IExBWllfQ01QU19QQVRIX1RPS0VOIH0gZnJvbSAnLi90b2tlbnMnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbTGF6eUxvYWREaXJlY3RpdmVdLFxuICBleHBvcnRzOiBbTGF6eUxvYWREaXJlY3RpdmVdXG59KVxuZXhwb3J0IGNsYXNzIE5neExhenlFbE1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KG1vZHVsZVBhdGhzOiBhbnlbXSk6IE1vZHVsZVdpdGhQcm92aWRlcnM8Tmd4TGF6eUVsTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBOZ3hMYXp5RWxNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgLy8geyBwcm92aWRlOiBOZ01vZHVsZUZhY3RvcnlMb2FkZXIsIHVzZUNsYXNzOiBTeXN0ZW1Kc05nTW9kdWxlTG9hZGVyIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBMQVpZX0NNUFNfUEFUSF9UT0tFTixcbiAgICAgICAgICB1c2VWYWx1ZTogbW9kdWxlUGF0aHNcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH07XG4gIH1cbn1cbiJdfQ==