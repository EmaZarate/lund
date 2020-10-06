import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectBusinessunitComponent } from './components/select-businessunit/select-businessunit.component';
import { TitleComponentComponent } from './components/title-component/title-component.component';
import { DocumentAttachedListComponent } from './components/document-attached-list/document-attached-list.component';
import { NewsSequenceListComponent } from './components/news-sequence-list/news-sequence-list.component';
import { PersonComponent } from './components/person/person.component';
import { AlertModule, ButtonModule, CheckboxModule, DatePickerModule, GridModule, InputModule, SelectModule, TextareaModule, TitleModule, UploaderModule, RadioModule, ModalModule } from '@sc/portal.fe.lib.ui-core-components';
import { GenericDataRiskComponent } from './components/generic-data-risk/generic-data-risk.component';
import { GenericDataCaseComponent } from './components/generic-data-case/generic-data-case.component';
import { GenericDataComponent } from './components/generic-data/generic-data.component';
import { ContactInfoComponent } from './components/contact-info/contact-info.component';
import { UploadNewDocumentComponent } from './components/upload-new-document/upload-new-document.component';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { GenericDataPersonComponent } from './components/generic-data-person/generic-data-person.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { SelectedCellComponent } from './components/selected-cell/selected-cell.component';
import { UploadService } from './components/upload-new-document/service/upload.service';
import { LoadingComponent } from './components/loading/loading.component';
import { LoadingModule } from './modules/loading/loading.module';
import { EmptyDataComponent } from './components/empty-data/empty-data.component';
import { NewsSequenceDetailComponent } from './components/news-sequence-detail/news-sequence-detail.component';
import { DocketComponent } from './components/docket/docket.component';
import { InfoRequirementComponent } from './components/info-requirement/info-requirement.component';

@NgModule({
  declarations: [
    SelectBusinessunitComponent,
    PersonComponent, 
    TitleComponentComponent,
    DocumentAttachedListComponent, 
    GenericDataRiskComponent, 
    GenericDataCaseComponent, 
    GenericDataPersonComponent,
    GenericDataComponent, 
    ContactInfoComponent,
    NewsSequenceListComponent,
    UploadNewDocumentComponent,
    UploadFileComponent,
    GenericDataPersonComponent,
    SelectedCellComponent,
    LoadingComponent,
    EmptyDataComponent,
    NewsSequenceDetailComponent,
    DocketComponent,
    InfoRequirementComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputModule,
    UploaderModule.setUploader(UploadService),
    SelectModule,
    TitleModule,
    CheckboxModule,
    ButtonModule,
    GridModule,
    TextareaModule,
    UploaderModule,
    DatePickerModule,
    AlertModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    RadioModule,
    ModalModule,
    LoadingModule,
    MatTooltipModule
  ],
  exports: [
    PersonComponent,
    TitleComponentComponent,
    DocumentAttachedListComponent,
    SelectBusinessunitComponent,
    GenericDataPersonComponent,
    GenericDataComponent,
    GenericDataRiskComponent, 
    GenericDataCaseComponent,
    ContactInfoComponent,
    NewsSequenceListComponent,
    UploadNewDocumentComponent,
    LoadingComponent,
    EmptyDataComponent,
    NewsSequenceDetailComponent,
    DocketComponent,
    InfoRequirementComponent
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'spa-AR'}
  ]
})
export class SharedModule { }
