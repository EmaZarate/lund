import { success, error } from './../../../../../constants/alert-messages';
import { ToastrService } from 'ngx-toastr';
import { GrayListService } from './../../services/gray-list.service';
import { FilterTablePersonManagement } from './../../../person-management/models/filterTablePersonManagement';
import { LoadingService } from 'src/app/core/services/loading.service';
import { UrlTranslator } from './../../scripts/UrlSegmentTranslator';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { GrayList } from '../../models/gray-list.model';
import { PersonService } from 'src/app/main/person-management/person.service';
import { Person } from 'src/app/main/person-management/models/person.model';
import { DocumentAttached } from 'src/app/shared/models/document-attached.model';
import { tap, delay } from 'rxjs/operators';

@Component({
  selector: 'app-gray-list-detail',
  templateUrl: './gray-list-detail.component.html',
  styleUrls: ['./gray-list-detail.component.scss']
})
export class GrayListDetailComponent implements OnInit {

  title = 'Lista gris';
  
  isReadOnly: boolean = false;
  isNewGrayList: boolean = false;
  isEditing: boolean = false;
  isDisable: boolean = true;
  hadFilter: boolean = false;
  
  filter: FilterTablePersonManagement = new FilterTablePersonManagement();
  newDocumentAttached: DocumentAttached[] = [];
  documents: Observable<DocumentAttached[]>;
  grayListPerson: Observable<GrayList[]> | Person[];
  
  grayListCommand: GrayListCommand;
  grayListUpdateCommand: GrayListUpdateCommand;

  form: FormGroup;

  // Getters for information to be sended // 

  get person() { return this.form.get('person'); }
  get comments() { return this.form.get('comment'); }
  get document () { return this.newDocumentAttached; }
  get firstName() { return this.form.get('firstName'); }
  get lastName() { return this.form.get('lastName'); }

  get editPath() { return parseInt(this.route.snapshot.url[0].path); }

  constructor(private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              private ldg: LoadingService,
              private personService: PersonService,
              private grayListService: GrayListService) { }

  ngOnInit() {
    this.ldg.setLoading(true);

    this.getPath();
    this.setTitle();
    this.setOperationType();

    this.initForm();
    this.onFormChanges();

    if (this.isEditing || this.isReadOnly) {
      this.getData(parseInt(this.route.snapshot.url[0].path));
    }

    this.ldg.setLoading(false);
  }

  private getPath(): string {
    let operation = this.route.snapshot.url[1] ? this.route.snapshot.url[1].path : this.route.snapshot.url[0].path;
    let formatedOperation = new UrlTranslator();
    let result = formatedOperation.convert(operation);
    return result;
  }

  private setTitle(): void {
    let subtitle = this.getPath();
    this.title = `${this.title} - ${subtitle}`; 
  }

  private setOperationType(): void {
    let op = this.getPath();
    if (op === 'Edición') {
      this.isEditing = true;
    }
    else if (op === 'Nuevo') {
      this.isEditing = false;
      this.isNewGrayList = true;
    }
    else if (op === 'Detalle') {
      this.isReadOnly = true;
    }
  }

  private initForm(): void {
    this.form = this.fb.group({
      id: ['-'],
      firstName: [''],
      lastName: [''],
      person: ['', [Validators.required]],
      comment: ['', [Validators.required]]
    })
  }

  private onFormChanges(): void {
    this.form.valueChanges.subscribe(() => {
      this.checkValidState();
    })
  }

  private checkValidState(): void {
    // Validate if the form is valid & if the document length is bt zero //
    if (this.form.valid && this.document.length > 0){
      this.isDisable = false;
    }
    else {
      this.isDisable = true;
    }
  }

  private getData(grayListPersonId?: number): void {
    // If is editing or reading the detail, use this service //
    if(grayListPersonId) {
      this.grayListService.getByIdGrayListPerson(grayListPersonId)
                          .subscribe(item => {               
                            // Adding fullName prop based on firstName, lastName & cuit // 
                            let newItem: GrayList = { ...item, fullName: item.person.firstName + ' ' + item.person.lastName + ' - ' + item.person.cuit };
                            // Setting GrayList array because the form control is specting an array // 
                            let newItemArray = [];
                            newItemArray.push(newItem);
                            // Set response values to form controls & grayListPerson Observable //
                            this.form.patchValue({ id: newItem.id, comment: newItem.comments})
                            this.grayListPerson =  of(newItemArray).pipe(tap(() => {
                              this.form.patchValue({ person: newItemArray[0]})
                            }));
                            // Get documents attached 
                            this.getDocuments(item.id)
                          });
    }
    // If is creating a new person in gray list, use this other service
    else {
    // Getting people for select control //
      this.personService.getByFilter(this.getFilter())
                        .subscribe(res => {
                          console.log(res);
                          this.hadFilter = true;
                          let newPerson: Person[] = [];
                          // Adding fullName prop based on firstName, lastName & cuit // 
                          res.forEach((item) => {
                            let newItems: Person = { ...item, fullName: item.firstName + ' ' + item.lastName + ' - ' + item.cuit}
                            newPerson.push(newItems);
                          });
                          // Reset the search fields // 
                          this.resetFieldsAfterSearch();
                          // Then assign the newPerson array to the property that //
                          // takes the data into the select control //
                          this.grayListPerson = newPerson
                        });
    }
  }

  private getFilter() : FilterTablePersonManagement {
    var buid: number = parseInt(localStorage.getItem('businessUnitId'));

    this.filter = {
      cuit: '',
      fullName: this.firstName.value + this.lastName.value,
      riskId: 0,
      tranBefore: '',
      tranAfter: '',
      orderId: 0,
      businessUnitId: buid,
      group: false,
      getWithoutGrouping: false,
      groupCode: 0
    };

    return this.filter;
  }

  // -- After everything is set up -- //
  
  onPersonSelected(event): void {
    // Wait for select control to change to get the documents attached to the person // 
    this.getDocuments(event.id);
  }

  private getDocuments(id: number): void {
    this.grayListService.getGrayListDocumentsById(id)
                        .subscribe(res => {
                          // The response gets the GrayListDocument object, that contains //
                          // the DocumentAttached object// 
                          // Here we're adding the docs into a new array of documents //
                          let documents: DocumentAttached[] = [];
                          res.forEach((item) => {
                            let document = item.document
                            documents.push(document);
                          })
                          // Assign the result to the observable source that is listening to changes //
                          this.documents = of(documents).pipe(delay(1000));
                        })
  }

  onNewDocument(event): void {
    // When uploading a new document, an event is emitted //
    // The event is assign to the new document array //
    // And check if it's valid // 
    this.newDocumentAttached = event;
    // Let the Observable take the new value // 
    this.documents = of(event);
    this.checkValidState();
  }

  onDeletedDocument(event: number): void {
    // When deleting a document, an event is emitted //
    
    // The event is compared to the new document array //
    // And find the index of the deleted document // 
    let deletedItemIndex: number = this.document.findIndex((doc) => doc.documentId == event)
    // Then it's also removed from the new document array //
    this.document.splice(deletedItemIndex, 1);
    // Let the Observable take the new value //
    this.documents = of(this.document);
    // And check if it's valid // 
    this.checkValidState();
  }

  submitInfo(): void {
    let ids: number[] = [];
    // When submitting the result, add all the documentId's to the ids variable //
    this.document.forEach(doc => {
      ids.push(doc.documentId);
    });
    // Disable the accept button //
    this.isDisable = true;
    // If it's creating a new record
    if (this.isNewGrayList) {
      // Setup the grayListCommand to send to the backend server //
      this.grayListCommand = {
        comments: this.comments.value,
        personId: this.person.value.id,
        documentId: ids
      }
      // Send the object to the service & subscribe to the results // 
      this.grayListService.addNewGrayListPerson(this.grayListCommand)
                          .subscribe(res => {
                            // If true, alert the result, reset the form & navigate back to the list // 
                            if (res) {
                              this.toastr.success(success.message.grayList, success.status)
                                         .onHidden.subscribe(() => { this.navigateToList(); })
                            }
                            // If false, alert the result // 
                            else {
                              this.toastr.error(error.message.grayList, error.status);
                              // Enable the accept button so the info con be re-sended //
                              this.isDisable = false;
                            }
                          })
    }
    else if (this.isEditing) {
      // If it's editing an existing record
      this.grayListUpdateCommand = {
        grayListId: this.person.value.id,
        comments: this.comments.value,
        documentId: ids
      }
      this.grayListService.updateGrayListPersonAndDocuments(this.grayListUpdateCommand)
                          .subscribe(res => {
                            // If true, alert the result, reset the form & navigate back to the list // 
                            if (res) {
                              this.toastr.success(success.message.grayListUpdate, success.status)
                                         .onHidden.subscribe(() => { this.navigateToList(); })
                            }
                            // If false, alert the result // 
                            else {
                              this.toastr.error(error.message.grayListUpdate, error.status);
                              // Enable the accept button so the info con be re-sended //
                              this.isDisable = false;
                            }
                          })
    }
  }

  onSearch(): void {
    this.getData();
  }

  private resetFieldsAfterSearch(): void {
    this.firstName.setValue('');
    this.lastName.setValue('');
  }

  navigateToList(): void {
    this.router.navigate(['../gray-list']);
  }
}

export interface GrayListCommand {
  personId: number;
  comments: string;
  documentId: number[];
}

export interface GrayListUpdateCommand {
  grayListId: number;
  comments: string;
  documentId: number[];
}
