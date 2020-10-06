import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonRoutingModule } from './person-routing.module';
import { PersonListComponent } from './components/person-list/person-list.component';
import { GridModule, SelectModule, TitleModule, ButtonModule, CheckboxModule, FilterBoxModule, InputModule, ModalModule, PaginationModule } from '@sc/portal.fe.lib.ui-core-components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonDetailComponent } from './components/person-detail/person-detail.component';
import { PersonEditComponent } from './components/person-edit/person-edit.component';
import { PersonEditFormComponent } from './components/person-edit-form/person-edit-form.component';

@NgModule({
  declarations: [
    PersonListComponent, 
    PersonDetailComponent, 
    PersonEditComponent, 
    PersonEditFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PersonRoutingModule,
    GridModule,
    SelectModule,
    CheckboxModule,
    TitleModule,
    ButtonModule,
    SharedModule,
    FilterBoxModule,
    InputModule,
    ModalModule,
    PaginationModule
  ]
})
export class PersonModule { }
