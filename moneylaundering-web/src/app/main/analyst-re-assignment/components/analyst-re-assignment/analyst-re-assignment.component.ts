import { LoadingService } from './../../../../core/services/loading.service';
import { success, error} from './../../../../../constants/alert-messages';
import { ToastrService } from 'ngx-toastr';
import { AnalystReAssignmentService } from '../../services/analyst-re-assignment.service'
import { FormGroup } from '@angular/forms';
import { DocumentAttachedService } from 'src/app/shared/components/document-attached-list/document-attached.service';
import { SelectLocationService } from './../../../../shared/services/select-location.service';
import { SelectStateService } from './../../../../shared/services/select-state.service';
import { DocumentAttached } from 'src/app/shared/models/document-attached.model';
import { ContactInfo } from '../../../case-management/models/contact.interface';
import { LocationModel } from './../../../../shared/models/location.model';
import { StateModel } from './../../../../shared/models/state.model';
import { News } from 'src/app/main/case-management/models/news';
import { Case } from 'src/app/main/analyst-assignment/models/case.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AnalystAssignmentService } from 'src/app/main/analyst-assignment/analyst-assignment.service';
import { Person } from 'src/app/main/case-management/models/person.model';
import { delay, map } from 'rxjs/operators';
import { Observable, of, Subject, pipe, observable } from 'rxjs';
import { BoolToNumberMap } from 'src/app/shared/boolToNumberMap';

@Component({
  selector: 'app-analyst-re-assignment',
  templateUrl: './analyst-re-assignment.component.html',
  styleUrls: ['./analyst-re-assignment.component.scss']
})
export class AnalystReAssignmentComponent implements OnInit {

  case: Case;
  person: Person;
  news: Observable<News[]>;
  newsReason: number = 11;
  locations: Observable<LocationModel[]>;
  contactInfo: ContactInfo;
  documents: Observable<DocumentAttached[]>;
  docket: number;
  mapper: BoolToNumberMap = new BoolToNumberMap();
  
  isFormValid: boolean;
  contactForm: FormGroup;
  caseForm: FormGroup;
  newsForm: FormGroup;
  docketFormValue: any;
  newsObservation: string;
  newsReasonTypeId: number;
  analystId: string;

  constructor(
              private route: ActivatedRoute,
              private router: Router,
              private analystAssignmentService: AnalystAssignmentService,
              private locationService: SelectLocationService,
              private documentService: DocumentAttachedService,
              private analystReAssignmentService: AnalystReAssignmentService,
              private toastr: ToastrService,
              private ldg: LoadingService) { }

  ngOnInit() {
    this.ldg.setLoading(true);
    this.getCase(this.route.snapshot.params.id)
  }

  private getCase(id: number) {
    this.analystAssignmentService.getCase(id).subscribe(res => {
      this.case = res;
      this.person = res.person;
      this.news = of(this.case.newsList)
      this.ldg.setLoading(false);
      this.docket = this.mapper.boolToNumberMap(res.updateFile)
      this.getDocuments(res.personId)
      this.setContactInfo(res.contactMail, res.contactAddress, res.contactZipCode, res.contactStateId, res.contactCity)
    })
  }

  private getDocuments(id: number) {
    this.documentService.getDocumentsByPersonId(id)
                        .subscribe(res => {
                          this.documents = of(res);
                        })
  }

  private setContactInfo(contactMail, contactAddress, contactZipCode, contactStateId, contactCity) 
  {                     
    this.contactInfo = { contactMail, contactAddress, contactZipCode, contactStateId, contactCity }
  } 

  onOptionChange(event: StateModel) {
    if(event == null) {
      return;
    }
    this.locationService.getLocations(event)
      .subscribe(locations => {
        this.locations = of(locations).pipe(delay(1000));
      })
  }

  onAccept() {
    this.isFormValid=false
    this.analystReAssignmentService
        .analystReAssignmentNews(
          this.case.id, 
          this.case.businessUnitId, 
          this.analystId, 
          this.newsObservation, 
          this.newsReasonTypeId, 
          this.docketFormValue,
          this.contactForm.controls['productorEmail'].value,
          this.contactForm.controls['personAddress'].value,
          this.contactForm.controls['personCity'].value['zipCode'],
          this.contactForm.controls['personProvince'].value['description'],
          this.contactForm.controls['personCity'].value['description'],
          this.contactForm.controls['personProvince'].value['stateId'])
        .subscribe(res => {
          this.toastr.success(success.message.news, success.status)
              .onHidden.subscribe(() => this.router.navigate(['../../case-management']))
        }, err => this.toastr.error(error.message.news, error.status))
  }

  onValidCase(event) {
    this.caseForm = event;
    this.analystId = event.value.userId;
    this.validatedForm();
  }

  onValidNews(event:FormGroup) {
    this.newsForm = event;
    this.newsObservation = this.newsForm.get('observations').value;
    let newsReason = this.newsForm.get('reasons').value;
    this.newsReasonTypeId = newsReason.newsReasonTypeId;
    this.validatedForm();
  }

  onValidContact(event) {
    this.contactForm = event;
    this.validatedForm();
  }

  onValidDocket(event) {
    this.docketFormValue = event
  }

  validatedForm() {
    if(!this.caseForm || !this.contactForm || !this.newsForm) {
      return;
    }
    if (this.caseForm.valid && this.contactForm.valid && this.newsForm.valid) {
      this.isFormValid = true;
    }
    else {
      this.isFormValid = false;
    }
  }
  
  onCancel() {
    this.router.navigate(['../../case-management']);
  }
}
