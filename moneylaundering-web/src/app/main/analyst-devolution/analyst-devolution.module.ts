import { ButtonModule } from '@sc/portal.fe.lib.ui-core-components';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalystDevolutionRoutingModule } from './analyst-devolution-routing.module';
import { AnalystDevolutionComponent } from './components/analyst-devolution/analyst-devolution.component';


@NgModule({
  declarations: [AnalystDevolutionComponent],
  imports: [
    CommonModule,
    AnalystDevolutionRoutingModule,
    SharedModule,
    ButtonModule
  ]
})
export class AnalystDevolutionModule { }
