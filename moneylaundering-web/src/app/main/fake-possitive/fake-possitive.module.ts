import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FakePossitiveRoutingModule } from './fake-possitive-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { ButtonModule } from '@sc/portal.fe.lib.ui-core-components';
import { FakePossitiveComponent } from './components/fake-possitive/fake-possitive.component';



@NgModule({
  declarations: [
    FakePossitiveComponent,
  ],
  imports: [
    CommonModule,
    FakePossitiveRoutingModule,
    SharedModule,
    ButtonModule,
  ],
  exports: [
    FakePossitiveComponent,
  ]
})

export class FakePossitiveModule { }
