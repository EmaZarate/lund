import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InifyPeopleRoutingModule } from './inify-people-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GridModule, FilterBoxModule, InputModule, ButtonModule, TitleModule, SelectModule, PendingChangesWarningModalModule, ModalModule } from '@sc/portal.fe.lib.ui-core-components';
import { InifyPeopleListComponent } from './components/inify-people-list/inify-people-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { InifyPeopleComponent } from './components/inify-people/inify-people.component';
import { AddPersonUnificationComponent } from './components/add-person-unification/add-person-unification.component';


@NgModule({
  declarations: [InifyPeopleListComponent, InifyPeopleComponent, AddPersonUnificationComponent],
  imports: [
    CommonModule,
    InifyPeopleRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    GridModule,
    FilterBoxModule,
    SelectModule,
    InputModule,
    ButtonModule,
    TitleModule,
    SharedModule,
    PendingChangesWarningModalModule,
    ModalModule
  ]
})
export class InifyPeopleModule { }
