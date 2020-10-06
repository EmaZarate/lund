import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangeExpirationRoutingModule } from './change-expiration-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { ButtonModule } from '@sc/portal.fe.lib.ui-core-components';
import { ChangeExpirationComponent } from './components/change-expiration/change-expiration.component';


@NgModule({
  declarations: [
    ChangeExpirationComponent,
  ],
  imports: [
    CommonModule,
    ChangeExpirationRoutingModule,
    SharedModule,
    ButtonModule,
  ],
  exports: [
    ChangeExpirationComponent,
  ]
})
export class ChangeExpirationModule { }
