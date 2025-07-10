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
}
/** @nocollapse */ NgxLazyElModule.ɵmod = i0.ɵɵdefineNgModule({ type: NgxLazyElModule });
/** @nocollapse */ NgxLazyElModule.ɵinj = i0.ɵɵdefineInjector({ factory: function NgxLazyElModule_Factory(t) { return new (t || NgxLazyElModule)(); }, imports: [[CommonModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NgxLazyElModule, { declarations: [LazyLoadDirective], imports: [CommonModule], exports: [LazyLoadDirective] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NgxLazyElModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule],
                declarations: [LazyLoadDirective],
                exports: [LazyLoadDirective]
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWxhenktZWwubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Ii93b3Jrc3BhY2Uvbmd4LWxhenktZWwvbGlicy9uZ3gtbGF6eS1lbC9zcmMvIiwic291cmNlcyI6WyJsaWIvbmd4LWxhenktZWwubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQXVCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxVQUFVLENBQUM7O0FBT2hELE1BQU0sT0FBTyxlQUFlO0lBQzFCLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBa0I7UUFDL0IsT0FBTztZQUNMLFFBQVEsRUFBRSxlQUFlO1lBQ3pCLFNBQVMsRUFBRTtnQkFDVCx3RUFBd0U7Z0JBQ3hFO29CQUNFLE9BQU8sRUFBRSxvQkFBb0I7b0JBQzdCLFFBQVEsRUFBRSxXQUFXO2lCQUN0QjthQUNGO1NBQ0YsQ0FBQztJQUNKLENBQUM7O3NFQVpVLGVBQWU7Z0lBQWYsZUFBZSxrQkFKakIsQ0FBQyxZQUFZLENBQUM7d0ZBSVosZUFBZSxtQkFIWCxpQkFBaUIsYUFEdEIsWUFBWSxhQUVaLGlCQUFpQjtrREFFaEIsZUFBZTtjQUwzQixRQUFRO2VBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO2dCQUN2QixZQUFZLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztnQkFDakMsT0FBTyxFQUFFLENBQUMsaUJBQWlCLENBQUM7YUFDN0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IExhenlMb2FkRGlyZWN0aXZlIH0gZnJvbSAnLi9sYXp5LWxvYWQuZGlyZWN0aXZlJztcbmltcG9ydCB7IExBWllfQ01QU19QQVRIX1RPS0VOIH0gZnJvbSAnLi90b2tlbnMnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbTGF6eUxvYWREaXJlY3RpdmVdLFxuICBleHBvcnRzOiBbTGF6eUxvYWREaXJlY3RpdmVdXG59KVxuZXhwb3J0IGNsYXNzIE5neExhenlFbE1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KG1vZHVsZVBhdGhzOiBhbnlbXSk6IE1vZHVsZVdpdGhQcm92aWRlcnM8Tmd4TGF6eUVsTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBOZ3hMYXp5RWxNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgLy8geyBwcm92aWRlOiBOZ01vZHVsZUZhY3RvcnlMb2FkZXIsIHVzZUNsYXNzOiBTeXN0ZW1Kc05nTW9kdWxlTG9hZGVyIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBMQVpZX0NNUFNfUEFUSF9UT0tFTixcbiAgICAgICAgICB1c2VWYWx1ZTogbW9kdWxlUGF0aHNcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH07XG4gIH1cbn1cbiJdfQ==