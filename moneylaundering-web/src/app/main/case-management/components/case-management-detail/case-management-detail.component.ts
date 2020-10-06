import { DocumentAttached } from './../../../../shared/models/document-attached.model';
import { DocumentAttachedService } from './../../../../shared/components/document-attached-list/document-attached.service';
import { LoadingService } from './../../../../core/services/loading.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PersonService } from 'src/app/main/person-management/person.service';
import { AnalystAssignmentService } from 'src/app/main/analyst-assignment/analyst-assignment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationModel } from 'src/app/shared/models/location.model';
import { StateModel } from 'src/app/shared/models/state.model';
import { Case } from 'src/app/main/case-info-requirement/models/case.model';
import { Person } from 'src/app/main/person-management/models/person.model';
import { Observable, of } from 'rxjs';
import { News } from '../../models/news';
import { BoolToNumberMap } from 'src/app/shared/boolToNumberMap';
import { ContactInfo } from '../../models/contact.interface';

@Component({
  selector: 'app-case-management-detail',
  templateUrl: './case-management-detail.component.html',
  styleUrls: ['./case-management-detail.component.scss']
})
export class CaseManagementDetailComponent implements OnInit {

  @Output() button = new EventEmitter<any>();
  isNewCase: boolean;

  case: Case;
  person: Person;
  contactInfo: ContactInfo;
  documents: Observable<DocumentAttached[]>;
  docket: number;
  mapper: BoolToNumberMap = new BoolToNumberMap();

  documentsList: DocumentAttached[] = [];
  news: Observable<News[]>;
  title;
  states: StateModel[];
  state: StateModel;
  locations: LocationModel[];
  location: LocationModel;
  navigateUrl: string;
  docketFormValue;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private analystassignmentService: AnalystAssignmentService,
    private personService : PersonService,
    private loadingService: LoadingService,
    private documentService: DocumentAttachedService
  ) { }

  ngOnInit() {
    this.loadingService.setLoading(true);
    this.getCase(this.route.snapshot.params.id);
  }

  handleButtonClick() {
    this.button.emit(
      this.navigateToList()
    );
  }

  private getCase(id: number) {

    this.analystassignmentService.getCase(id).subscribe(res => {
      this.case = res;
      this.getDocuments(res.personId);
      debugger;
      this.news = of(res.newsList);
      this.docket = this.mapper.boolToNumberMap(res.updateFile);
      this.setContactInfo(res.contactMail, res.contactAddress, res.contactZipCode, res.contactStateId, res.contactCity)
      this.personService.getById(this.case.person.id).subscribe(res => {
        this.person = res;
        this.navigateUrl='/person-management/' + this.person.id + '/detail3';
        this.loadingService.setLoading(false);
      });
    });

  }

  private setContactInfo(contactMail, contactAddress, contactZipCode, contactStateId, contactCity) 
  {                     
    this.contactInfo = { contactMail, contactAddress, contactZipCode, contactStateId, contactCity }
  } 

  private getDocuments(id: number) {
    this.documentService.getDocumentsByPersonId(id)
                        .subscribe(res => {
                          this.documents = of(res);
                          this.documentsList = res;
                        })
  }

  private navigateToList() {
    this.router.navigate(['../case-management']);
  }
}
