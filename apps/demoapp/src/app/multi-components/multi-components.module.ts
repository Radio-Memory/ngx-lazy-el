import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cmp1Component } from './cmp1.component';
import { Cmp2Component } from './cmp2.component';

@NgModule({
    declarations: [Cmp1Component, Cmp2Component],
    imports: [CommonModule]
})
export class MultiComponentsModule {
  static customElementComponent: { [prop: string]: Type<any> } = {
    'juristr-cmp1': Cmp1Component,
    'juristr-cmp2': Cmp2Component
  };
}
