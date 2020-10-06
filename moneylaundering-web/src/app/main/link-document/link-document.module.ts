import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LinkDocumentRoutingModule } from './link-document-routing.module';
import { GridModule, TitleModule, ButtonModule } from '@sc/portal.fe.lib.ui-core-components';
import { SharedModule } from 'src/app/shared/shared.module';
import { LinkComponentComponent } from './components/link-component/link-component.component';


@NgModule({
  declarations: [LinkComponentComponent],
  imports: [
    CommonModule,
    LinkDocumentRoutingModule,
    GridModule,
    TitleModule,
    SharedModule,
    ButtonModule
  ]
})
export class LinkDocumentModule { }
