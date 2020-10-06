import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridModule, SelectModule, TitleModule, ButtonModule, CheckboxModule, FilterBoxModule, InputModule, ModalModule } from '@sc/portal.fe.lib.ui-core-components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewsDetailRoutingModule } from './news-detail-routing.module';
import { NewsDetailComponent } from './components/news-detail.component';

@NgModule({
  declarations: [
    NewsDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GridModule,
    SelectModule,
    CheckboxModule,
    TitleModule,
    ButtonModule,
    SharedModule,
    FilterBoxModule,
    InputModule,
    ModalModule,
    NewsDetailRoutingModule
    ],
  exports: [
    NewsDetailComponent,
  ]
})
export class NewsDetailModule { }
