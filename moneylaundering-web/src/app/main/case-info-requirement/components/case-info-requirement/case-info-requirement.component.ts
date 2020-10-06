import { LoadingService } from './../../../../core/services/loading.service';
import { Component, OnInit } from '@angular/core';
import { Case } from '../../models/case.model';
import { Person } from '../../models/person.model';
import { News } from '../../models/news.model';
import { LocationModel } from 'src/app/shared/models/location.model';
import { Observable, of } from 'rxjs';
import { DocumentAttached } from 'src/app/shared/models/document-attached.model';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectLocationService } from 'src/app/shared/services/select-location.service';
import { DocumentAttachedService } from 'src/app/shared/components/document-attached-list/document-attached.service';
import { AnalystAssignmentService } from 'src/app/main/analyst-assignment/analyst-assignment.service';
import {CaseInfoRequirementService}from  '../../services/case-info-requirement.service'
import { success, error } from 'src/constants/alert-messages';
import { BoolToNumberMap } from 'src/app/shared/boolToNumberMap';

@Component({
  selector: 'app-case-info-requirement',
  templateUrl: './case-info-requirement.component.html',
  styleUrls: ['./case-info-requirement.component.scss']
})
export class CaseInfoRequirementComponent implements OnInit {
  case: Case;
  person: Person;
  news: Observable<News[]>;
  newsReason: number = 10;
  locations: Observable<LocationModel[]>;
  documents: Observable<DocumentAttached[]>;
  docket: number;
  mapper: BoolToNumberMap = new BoolToNumberMap();
  
  isFormValid: boolean;
  reqForm: FormGroup;
  caseForm: FormGroup;
  newsForm: FormGroup;
  newsObservation: string;
  newsReasonTypeId: number;
  docketFormValue: any;
load: boolean=false;

itemsEmailType: any []= [];
itemsLetterType: any []= [];
itemsDuplicates: any[] = [];

  toastr: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private locationService: SelectLocationService,
    private documentService: DocumentAttachedService,
    private analystAssignmentService: AnalystAssignmentService,
    private ldg: LoadingService,
    private caseInfoRequirementService : CaseInfoRequirementService
  ) { }

  ngOnInit() {
  
    this.ldg.setLoading(true);
      
    this.analystAssignmentService.getCase(this.route.snapshot.params.id)
    .subscribe(res => {

      this.case = res;
          this.person = res.person;
          this.news = of(this.case.newsList)
          this.docket = this.mapper.boolToNumberMap(res.updateFile)
          this.getDocuments(res.personId)
          this.ldg.setLoading(false);
          
          this.caseInfoRequirementService.getDuplicates(this.case.personId).subscribe(res=>{
          for (var i=0;i<res.length;i++){
            this.itemsDuplicates.push(
                { 
                  id: res[i].id,               
                  name: res[i].firstName + " " + res[i].lastName, 
                  address: res[i].address,
                  city: res[i].location.description,
                  cityId: res[i].location.locationId,
                  state: res[i].location.state.description,
                  stateId: res[i].location.state.stateId
                });
          }

          this.caseInfoRequirementService.getEmailType().subscribe(res=>{
            this.itemsEmailType = res;
          });

          this.caseInfoRequirementService.getDocumentLetterType().subscribe(res=>{
            this.itemsLetterType = res;
          });          
        });

    })
  }

  private getDocuments(id: number) {
    this.documentService.getDocumentsByPersonId(id)
                        .subscribe(res => {
                          this.documents = of(res);
                        })
  }
  onValidDocket(event) {
    this.docketFormValue = event
  }
  onValidNews(event:FormGroup) {
    this.newsForm = event;
    this.newsObservation = this.newsForm.get('observations').value;
    let newsReason = this.newsForm.get('reasons').value;
    debugger;
    this.newsReasonTypeId = newsReason.newsReasonTypeId;
    this.validatedForm();
  }
  onValidReq(event) {
    this.reqForm = event;
    this.validatedForm();
  }

  validatedForm() {
   
      this.isFormValid = true;
   
  }
  onAccept() {
    debugger;
    this.caseInfoRequirementService
    .infoRequirement(
      this.case.id, 
      this.case.businessUnitId, 
      this.newsObservation, 
      this.docketFormValue,
      this.reqForm.controls['email'].value,
      this.reqForm.controls['address'].value,
      this.reqForm.controls['cities'].value['zipCode'],
      this.reqForm.controls['states'].value['description'],
      this.reqForm.controls['cities'].value['description'],
      this.reqForm.controls['states'].value['stateId'],
      0,
      this.reqForm.controls['email'].value,
      this.reqForm.controls['emailType'].value.id,
      this.reqForm.controls['subject'].value,
      this.reqForm.controls['message'].value,
    )
    .subscribe(res => {
      this.toastr.success(success.message.news, success.status)
                .onHidden.subscribe(() => this.router.navigate(['../../case-management']))
    }, err => this.toastr.error(error.message.news, error.status))
  }

  onCancel() {
    
  }
}
