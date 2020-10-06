import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { LateralMenuModule } from '@sc/portal.fe.lib.ui-core-components';
import { CaseHigherInstanceDerivationComponent } from './case-higher-instance-derivation/components/case-higher-instance-derivation/case-higher-instance-derivation.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    LateralMenuModule,
    ReactiveFormsModule, 
    

  ]
})
export class MainModule { }
 