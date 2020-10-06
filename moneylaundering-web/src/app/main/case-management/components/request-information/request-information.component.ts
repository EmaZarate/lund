import { SelectLocationService } from './../../../../shared/services/select-location.service';
import { Component, OnInit, Input } from '@angular/core';
import { Case } from 'src/app/main/analyst-assignment/models/case.model';
import { Person } from '../../models/person.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AnalystAssignmentService } from 'src/app/main/analyst-assignment/analyst-assignment.service';
import { DocumentAttached } from 'src/app/shared/models/document-attached.model';
import { Observable, of } from 'rxjs';
import { News } from '../../models/news';
import { RequestInformationService } from './services/request-information.service';
import { ToastrService } from 'ngx-toastr';
import { PersonService } from 'src/app/main/person-management/person.service';
import { BoolToNumberMap } from 'src/app/shared/boolToNumberMap';
import { FormGroup } from '@angular/forms';
import { LocationModel } from 'src/app/shared/models/location.model';
import { ContactInfo } from '../../models/contact.interface';
import { StateModel } from 'src/app/shared/models/state.model';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-request-information',
  templateUrl: './request-information.component.html',
  styleUrls: ['./request-information.component.scss']
})
export class RequestInformationComponent implements OnInit {
  case: Case;
  person: Person;
  documents: Observable<DocumentAttached[]>;
  locations: Observable<LocationModel[]>;
  contactInfo: ContactInfo;
  docket: number;
  mapper: BoolToNumberMap = new BoolToNumberMap();
  news: Observable<News[]>;
  
  observation: string;
  contactForm: FormGroup;
  docketFormValue: any;
  isNewDocumentOpen = false;
  navigateUrl: string;
  isNewDocumentAttached: boolean;
  newDocumentCount: number = 0;
  isValid: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private analystassignmentService: AnalystAssignmentService,
    private requestInformationService: RequestInformationService,
    private router: Router,
    private toastr: ToastrService,
    private personService : PersonService,
    private locationService: SelectLocationService
  ) { }

  ngOnInit() {
    this.getCase(this.route.snapshot.params.id);

  }

  private getCase(id: number) {
    this.analystassignmentService.getCase(id).subscribe(res => {
      this.case = res;
      this.setContactInfo(res.contactMail, res.contactAddress, res.contactZipCode, res.contactStateId, res.contactCity)
      this.docket = this.mapper.boolToNumberMap(res.updateFile)
      this.person = this.case.person;
      this.prepareObservables();
    }
    
    )
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

  prepareObservables(){
     let arrayDoc = [];
      this.case.caseDocuments.forEach(doc => {
          arrayDoc.push(doc.document);
      });
      this.news = of(this.case.newsList);
      this.documents = of(arrayDoc);
   }

   onSave(){
     if(this.isFormValid()){
      this.PrepareEntity();
     }
     else{
      this.toastr.info('Debe completar la observación o adjuntar algún documento.', 'Información');
     }
   }

   isFormValid(){
    if ((this.observation != null && 
        this.observation != undefined && 
        this.observation != "" || 
        this.isNewDocumentAttached == true) && this.contactForm.valid){
      this.isValid = true;
      return true;
     } 
     else {
       this.isValid = false;
       return false;
     }
   }

   onChangeObservation(event){
     this.observation = event;
     this.isFormValid();
   }

   onDocumentAttached(event) {
    if(event) {
      this.newDocumentCount++;
      this.isNewDocumentAttached = true;
      this.isFormValid();
    }
   }

   onValidContact(event) {
     console.log(event);
    this.contactForm = event;
    this.isFormValid();
  }

   onValidDocket(event) {
    this.docketFormValue = event
  }

   onDocumentAttachedDeleted(event) {
    this.newDocumentCount--;
    if (this.newDocumentCount === 0) {
      this.isNewDocumentAttached = false
    }
    this.isFormValid();
   }
   
   async PrepareEntity(){
    this.requestInformationService
        .requestInformationCase(
          this.case.id, 
          this.case.businessUnitId, 
          this.observation,
          this.docketFormValue,
          this.contactForm.controls['productorEmail'].value,
          this.contactForm.controls['personAddress'].value,
          this.contactForm.controls['personCity'].value['zipCode'],
          this.contactForm.controls['personProvince'].value['description'],
          this.contactForm.controls['personCity'].value['description'],
          this.contactForm.controls['personProvince'].value['stateId'])
    .subscribe(
      res =>{
      this.toastr.success('Información recibida', 'Éxito')
                .onHidden.subscribe(() => this.router.navigate(['/case-management']));
    });
   }


   onCancelClick(){
    this.router.navigate(['/case-management']);
   }

}
