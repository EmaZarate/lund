import { LoadingService } from './../../../../core/services/loading.service';
import { Component, OnInit } from '@angular/core';
import { Case } from '../../../../main/analyst-assignment/models/case.model';
import { Person } from '../../../../main/case-management/models/person.model';
import { StateModel } from '../../../../shared/models/state.model';
import { ContactInfo } from '../../../../main/case-management/models/contact.interface';
import { LocationModel } from '../../../../shared/models/location.model';
import { DocumentAttached } from '../../../../shared/models/document-attached.model';
import { FakePossitiveService } from "../../fake-possitive.service";
import { Observable, of } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnalystAssignmentService } from '../../../../main/analyst-assignment/analyst-assignment.service';
import { SelectStateService } from '../../../../shared/services/select-state.service';
import { SelectLocationService } from '../../../../shared/services/select-location.service';
import { DocumentAttachedService } from '../../../../shared/components/document-attached-list/document-attached.service';
import { ToastrService } from 'ngx-toastr';
import { News } from '../../../../main/case-management/models/news';
import { delay } from 'rxjs/operators';
import { success, error } from 'src/constants/alert-messages';
import { BoolToNumberMap } from 'src/app/shared/boolToNumberMap';

@Component({
  selector: 'app-fake-possitive',
  templateUrl: './fake-possitive.component.html',
  styleUrls: ['./fake-possitive.component.scss']
})
export class FakePossitiveComponent implements OnInit {

  case: Case;
  person: Person;
  news: Observable<News[]>;
  newsReason: number = 1;
  states: StateModel[];
  locations: Observable<LocationModel[]>;
  contactInfo: ContactInfo;
  documents: Observable<DocumentAttached[]>;
  docket: number;
  mapper: BoolToNumberMap = new BoolToNumberMap();
  
  isFormValid: boolean;
  observation: string;
  expirationdate:Date;
  NewsReasonTypeId: number;
  
  contactForm: FormGroup;
  caseForm: FormGroup;
  newsForm: FormGroup;
  docketFormValue: any;
  newsObservation: string;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private analystAssignmentService: AnalystAssignmentService,
              private fakepossitiveService: FakePossitiveService,
              private stateService: SelectStateService,
              private locationService: SelectLocationService,
              private documentService: DocumentAttachedService,
              private toastr: ToastrService,
              private ldg: LoadingService
              ) { }

  ngOnInit() {
    this.ldg.setLoading(true);
    this.getCase(this.route.snapshot.params.id)
  }

private getCase(id: number) {
    this.analystAssignmentService.getCase(id).subscribe(res => {
      this.case = res;
      this.news= of(this.case.newsList);
      this.person = res.person;
      this.docket = this.mapper.boolToNumberMap(res.updateFile)
      this.getStates();
      this.getDocuments(res.personId)
      this.ldg.setLoading(false);
      this.setContactInfo(res.contactMail, res.contactAddress, res.contactZipCode, res.contactStateId, res.contactCity)
    })
  }

  private getStates() {
    this.stateService.getStates()
                      .subscribe(states => {
                        this.states = states
                      })
  }

  private getDocuments(id: number) {
    this.documentService.getDocumentsByPersonId(id)
                        .subscribe(res => {
                          this.documents = of(res);
                        })
  }

  private setContactInfo(contactMail,
                         contactAddress,
                         contactZipCode,
                         contactStateId,
                         contactCity) 
  {                     
    this.contactInfo = {
      contactMail,
      contactAddress,
      contactZipCode,
      contactStateId, 
      contactCity
    }
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

 
  
  onCancel() {
    this.router.navigate(['../../case-management']);
  }

  onAccept(){
    if(this.isFormValid){
      this.isFormValid=false;
     this.PrepareEntity();
    }else{
     this.toastr.info('Debe completar la observación o adjuntar algún documento.', 'Información');
    }
  }


  async PrepareEntity(){
   this.fakepossitiveService
      .falsepossitive(
        this.case.id, 
        this.case.businessUnitId, 
        this.observation, 
        this.NewsReasonTypeId,
        this.docketFormValue,
        this.contactForm.controls['productorEmail'].value,
        this.contactForm.controls['personAddress'].value,
        this.contactForm.controls['personCity'].value['zipCode'],
        this.contactForm.controls['personProvince'].value['description'],
        this.contactForm.controls['personCity'].value['description'],
        this.contactForm.controls['personProvince'].value['stateId'])
      .subscribe(
        res => {
          this.toastr.success(success.message.news, success.status)
          .onHidden.subscribe(() => this.router.navigate(['../../case-management']))
        }, err => this.toastr.error(error.message.news, error.status)
      )
  }

  onValidCase(event) {
    this.caseForm = event;
    this.validatedForm();
  }

  onValidNews(event:FormGroup) {
    this.newsForm = event;
    this.observation = this.newsForm.get('observations').value;
    let newsReason = this.newsForm.get('reasons').value;
    this.NewsReasonTypeId = newsReason.newsReasonTypeId;
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


}