import { LoadingService } from './../../../../core/services/loading.service';
import { ToastrService } from 'ngx-toastr';
import { CaseUnderestimatingService } from './../../services/case-underestimating.service';
import { Component, OnInit } from '@angular/core';
import { Case } from 'src/app/main/analyst-assignment/models/case.model';
import { Person } from 'src/app/main/case-management/models/person.model';
import { News } from 'src/app/main/case-management/models/news';
import { Observable, of, Subject } from 'rxjs';
import { LocationModel } from 'src/app/shared/models/location.model';
import { ContactInfo } from 'src/app/main/case-management/models/contact.interface';
import { DocumentAttached } from 'src/app/shared/models/document-attached.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AnalystAssignmentService } from 'src/app/main/analyst-assignment/analyst-assignment.service';
import { SelectStateService } from 'src/app/shared/services/select-state.service';
import { SelectLocationService } from 'src/app/shared/services/select-location.service';
import { DocumentAttachedService } from 'src/app/shared/components/document-attached-list/document-attached.service';
import { StateModel } from 'src/app/shared/models/state.model';
import { delay } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { success, error } from 'src/constants/alert-messages';
import { BoolToNumberMap } from 'src/app/shared/boolToNumberMap';

@Component({
  selector: 'app-case-underestimating',
  templateUrl: './case-underestimating.component.html',
  styleUrls: ['./case-underestimating.component.scss']
})
export class CaseUnderestimatingComponent implements OnInit {

  case: Case;
  person: Person;
  news: Observable<News[]>;
  newsReason: number = 2;
  locations: Observable<LocationModel[]>;
  contactInfo: ContactInfo;
  documents: Observable<DocumentAttached[]>;
  docket: number;
  mapper: BoolToNumberMap = new BoolToNumberMap();

  isFormValid: boolean;
  contactForm: FormGroup;
  newsForm: FormGroup;
  docketFormValue: any;
  newsObservation: string;
  newsReasonTypeId: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private analystAssignmentService: AnalystAssignmentService,
              private stateService: SelectStateService,
              private locationService: SelectLocationService,
              private documentService: DocumentAttachedService,
              private caseUnderestimatingService: CaseUnderestimatingService,
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
      this.news = of(res.newsList)
      this.docket = this.mapper.boolToNumberMap(res.updateFile)
      this.getDocuments(res.personId)
      this.ldg.setLoading(false);
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
    if(!this.contactForm || !this.newsForm) {
      return;
    }
    if (this.contactForm.valid && this.newsForm.valid) {
      this.isFormValid = true;
    }
    else {
      this.isFormValid = false;
    }
  }
  
  onAccept() {
    this.isFormValid = false
    this.caseUnderestimatingService
        .caseUnderestimating(
          this.case.id, 
          this.case.businessUnitId, 
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

  onCancel() {
    this.router.navigate(['../../case-management']);
  }
}
