import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { SharedModule } from '../shared';
import { HelloWorldComponent } from './hello-world.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
    declarations: [HelloWorldComponent],
    imports: [CommonModule, SharedModule, MatCardModule],
    exports: [HelloWorldComponent]
})
export class HelloWorldModule {
  static customElementComponent: Type<any> = HelloWorldComponent;
}
