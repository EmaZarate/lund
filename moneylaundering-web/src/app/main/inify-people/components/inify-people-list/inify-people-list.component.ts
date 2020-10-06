import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from '../../../person-management/models/person.model';
import { Observable, of } from 'rxjs';
import { GridSettings, GridColumnFactoryService } from '@sc/portal.fe.lib.ui-core-components';
import { FormGroup, FormBuilder } from '@angular/forms';
import { isNull, isUndefined } from 'util';
import { PersonService } from '../../../person-management/person.service';
import { FilterTablePersonManagement } from 'src/app/main/person-management/models/filterTablePersonManagement';
import { InifyPeopleService } from '../../inify-people.service';
import { LoadingService } from '../../../../core/services/loading.service';

@Component({
  selector: 'app-inify-people-list',
  templateUrl: './inify-people-list.component.html',
  styleUrls: ['./inify-people-list.component.scss']
})
export class InifyPeopleListComponent implements OnInit {

  constructor(
    private gridFactory: GridColumnFactoryService,
    private router: Router,
    private fb: FormBuilder,
    private personService: PersonService,
    private inifyPeopleSercvice: InifyPeopleService,
    private loadingService: LoadingService
    ) { }

  get cuit() {return this.form.get('cuit')}
  get firstname() {return this.form.get('firstname')}
  get surname() {return this.form.get('surname')}
  get orderId() {return this.form.get('orderId')}

  order = [{key:1, value: 'Apellido + Nombre'}];
  people: Observable<Person[]> = of([])
  peopleJson: Person[] = [];
  settings: GridSettings;
  form: FormGroup;
  filter = new FilterTablePersonManagement();

  ngOnInit() {
    this.getAllGroupPeople();
    this.initializeTable();
    this.form = this.createForm();
  }

  createForm(){
    return this.fb.group({
      surname: [''],
      firstname:[''],
      cuit: [''],
      orderId: ['']
    });
  }

  getAllGroupPeople(){
    let buid: number = parseInt(localStorage.getItem('businessUnitId'));
    buid = isNaN(buid) ? 1 : buid;
    this.filter = { cuit: '', fullName: '', riskId: 0, tranBefore: '', tranAfter: '', orderId: 0, businessUnitId: buid, group: true, getWithoutGrouping: false, groupCode: 0 };
    this.getPeople(this.filter);
  }

  getPeople(filter:FilterTablePersonManagement){
    this.loadingService.setLoading(true);
    this.personService.getByFilter(filter).subscribe(res => {
      this.peopleJson = res;
      this.gridOrder();
      this.people = of(this.peopleJson);
      this.loadingService.setLoading(false);
    },
    erro => {
      this.people = of([]);
      this.peopleJson = [];
      this.loadingService.setLoading(false);
    }
    ); 
  }

  applyFilters(){
    let buid: number = parseInt(localStorage.getItem('businessUnitId'));
    buid = isNaN(buid) ? 1 : buid;
    this.filter = { cuit: this.cuit.value, fullName: this.firstname.value+this.surname.value, riskId: 0, tranBefore: '', tranAfter: '', orderId: 0, businessUnitId: buid, group: true, getWithoutGrouping: false, groupCode: 0 };
    this.getPeople(this.filter);
  }

  deleteFilters(){
    this.cuit.setValue('');
    this.firstname.setValue('');
    this.surname.setValue('');
    this.orderId.patchValue(null);
    this.orderId.setValue('');
    this.getAllGroupPeople();
  }

  gridOrder() {    
    switch (this.orderId.value.key)
    {
      case 1:    
        this.peopleJson = this.peopleJson.sort((left, right): number => 
        {return (left.lastName+' '+left.firstName < right.lastName+' '+right.firstName) ? -1 : 1;});
        break;
  
      default: 
        break;
    }
  }

  newGroup(){
    this.inifyPeopleSercvice.groupPerson = null;
    this.inifyPeopleSercvice.groupPersonSource$.next(this.inifyPeopleSercvice.groupPerson)
    this.router.navigate(['/inify-people/new']);
  }

  handleSortedEvent(event){
    const params: Array<any> =  this.getFields(event.id);
    if(event.criteria == "DESC"){
      this.people = of(this.peopleJson.sort((x, y) => { return this.functionOrder(y,x,params)}));
    }
    else{
      this.people = of(this.peopleJson.sort((x, y) => { return this.functionOrder(x,y,params) }));
    }
  }

  getFields(params){
    let paramsArray = params.split('.');
    return paramsArray;
  }

  functionOrder(x:Person,y:Person,params:Array<any>){
    if(params.length > 1){
      if (x[params[0]][params[1]] > y[params[0]][params[1]]) {
        return 1;
      }
      if (x[params[0]][params[1]] < y[params[0]][params[1]]) {
        return -1;
      }
      return 0;
    }
    else{
      if (x[params[0]] > y[params[0]]) {
        return 1;
      }
      if (x[params[0]] < y[params[0]]) {
        return -1;
      }
      return 0;
    }
  }

  
  initializeTable() {

    this.settings = {
      columns: [
        this.gridFactory.actions({
          id: "menu",
          header: "Acciones",
          actions: [
            {
              label: 'Ver',
              icon: 'eye',
              action: (row: Person) => this.readGroup(row),
            },
            {
              label: 'Editar',
              icon: 'edit',
              action: (row: Person) => this.editGroup(row),
            }
          ],
        }),
        this.gridFactory.value({
          id: "groupCode",
          header: "Código",
          primaryValueGetter: (row: Person) => {
            return (row.id);
          },
        }),
        this.gridFactory.value({
          id: "firstName",
          header: "Nombre",
          sortable: true,
          primaryValueGetter: (row: Person) => {
            return row.firstName;
          },
        }),
        this.gridFactory.value({
          id: "lastName",
          header: "Apellido",
          sortable: true,
          primaryValueGetter: (row: Person) => {
            return row.lastName;
          },
        }), 
        this.gridFactory.value({
          id: "cuit",
          header: "CUIT",
          primaryValueGetter: (row: Person) => {
            return (row.cuit);
          },
        }),        
        this.gridFactory.value({
          id: "businessUnit.description",
          header: "Unidad de Negocio Origen",
          primaryValueGetter: (row: Person) => {
            return (isUndefined(row.businessUnit) ? "" : row.businessUnit.description);
          },
        })      
      ]
    };
  }
  
  readGroup(person:Person){
    this.router.navigate([`inify-people/read-group/${person.id}`]);
  }
  editGroup(person: Person){
    this.inifyPeopleSercvice.groupPerson = person;
    this.inifyPeopleSercvice.groupPersonSource$.next(person);
    this.router.navigate([`inify-people/edit-group/${person.id}`]);
  }

}
