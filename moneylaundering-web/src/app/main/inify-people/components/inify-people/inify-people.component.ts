import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from 'src/app/main/person-management/models/person.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GridColumnFactoryService, GridSettings } from '@sc/portal.fe.lib.ui-core-components';
import { isUndefined } from 'util';
import { Observable, of } from 'rxjs';
import { FilterTablePersonManagement } from 'src/app/main/person-management/models/filterTablePersonManagement';
import { InifyPeopleService } from '../../inify-people.service';
import { ToastrService } from 'ngx-toastr';
import { PersonService } from 'src/app/main/person-management/person.service';
import { LoadingService } from '../../../../core/services/loading.service';

@Component({
  selector: 'app-inify-people',
  templateUrl: './inify-people.component.html',
  styleUrls: ['./inify-people.component.scss']
})

export class InifyPeopleComponent implements OnInit {
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private gridFactory: GridColumnFactoryService,
    private router: Router,
    public inifyPeopleSercvice: InifyPeopleService,
    private toastr: ToastrService,
    private personService: PersonService,
    private loadingService: LoadingService
  ) { }

  @ViewChild('modalConfirm', {static: false})  modalConfirm: any;

  get groupPerson() {return this.form.get('groupPerson');};
  get cuit() {return this.form.get('cuit');};
  get businessUnit() {return this.form.get('businessUnit');};

  peopleSelect: any[] = [];
  people: Person[] = [];
  form: FormGroup;
  settings: GridSettings;
  peopleGrid : Observable<Person[]> = of([]);
  peopleGridJson : Person[] = []
  filter = new FilterTablePersonManagement();
  readOnly: boolean = false;
  peopleResultSearch:Person[] =[];

  ngOnInit() {
    this.form = this.createForm();
    this.getPeople();
    if(this.inifyPeopleSercvice.groupPerson)
    {
      this.groupPerson.patchValue(`${this.inifyPeopleSercvice.groupPerson.id}-${this.inifyPeopleSercvice.groupPerson.lastName} ${this.inifyPeopleSercvice.groupPerson.firstName}`);
      this.setCuitBusinessUnit(this.inifyPeopleSercvice.groupPerson);
    }

    this.initializeTable();
  }

  getPeople() {
    if (this.activatedRoute.snapshot.paramMap.get('id')) {
      if(this.activatedRoute.snapshot.data['read']) this.readOnly = true;
      this.loadingService.setLoading(true);
      let person: Person = this.activatedRoute.snapshot.data['person'];
      this.setGroupPerson(person);
      this.groupPerson.patchValue(`${person.id}-${person.lastName} ${person.firstName}`)
      this.setCuitBusinessUnit(person);
      this.groupPerson.disable();

      let buid: number = parseInt(localStorage.getItem('businessUnitId'));
      buid = isNaN(buid) ? 1 : buid;
      this.filter = { cuit: '', fullName: '', riskId: 0, tranBefore: '', tranAfter: '', orderId: 0, businessUnitId: buid, group: false, getWithoutGrouping: false, groupCode: +this.activatedRoute.snapshot.paramMap.get('id') };
      this.personService.getByFilter(this.filter).subscribe(people => {
        let allPeople: Person[] = JSON.parse(JSON.stringify(this.inifyPeopleSercvice.addedPeople));
        people.forEach(x => x.save = true);
        allPeople.push(...people);
        this.peopleGridJson = allPeople;
        this.peopleGrid = of(allPeople);
        this.loadingService.setLoading(false);
      },
      error =>{
        this.loadingService.setLoading(false);
      })
    } else {
      this.peopleGrid = this.inifyPeopleSercvice.addedPeople$;
      this.peopleGridJson = this.inifyPeopleSercvice.addedPeople;
      this.people = this.activatedRoute.snapshot.data['people'];
      if(this.people.length == 0){
        this.toastr.error("No se encontraron posibles agrupadres");
        this.router.navigate(['inify-people']);
      }
    }
  }

  setGroupPerson(person:Person){
    this.inifyPeopleSercvice.groupPerson = person;
    this.inifyPeopleSercvice.groupPersonSource$.next(person);
  }

  setCuitBusinessUnit(person:Person){
    this.cuit.setValue(person.cuit);
    this.businessUnit.setValue(person.businessUnit.description);
  }

  search(term: string): void {
    if(term == "") {
      this.peopleResultSearch = [];
      this.cuit.setValue("");
      this.businessUnit.setValue("");
      return;
    } 
    this.peopleResultSearch = this.people.filter(x => (x.firstName.toLowerCase().includes(term.toLowerCase()) || x.lastName.toLowerCase().includes(term.toLowerCase())))
  }

  selectPersonGroup(event){
    const id = +this.groupPerson.value.split('-')[0];
    const person: Person = this.people.find(x => x.id == id);
    this.setGroupPerson(person);
    this.setCuitBusinessUnit(person);
  }

  createForm(){
    return this.fb.group({
      groupPerson: ['', Validators.required],
      cuit: [''],
      businessUnit: ['']
    });
  }

  add(){
    if(this.form.valid) {this.router.navigate(['inify-people/add-person'])}
    else {this.toastr.warning("Seleccione una persona agrupadora")};
  }

  cancel(){
    this.router.navigate(['inify-people']);
  }

  initializeTable() {
    this.settings = {
      columns: [
        this.gridFactory.actions({
          id: 'menu',
          header: 'Acciones',
          getActionsCallback: (row: Person) => this.setGridActions(row)
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
        }),
        this.gridFactory.value({
          id: "save",
          header: "Grabada",
          primaryValueGetter: (row: Person) => {
            return ((!row.save) ? "No" : "Si");
          },
        })
      ]
    };
  }

  setGridActions(row: Person) : Array<any>{
    const action = [];
    if(!row.save){
      action.push({
        label: 'Borrar',
        icon: 'trash',
        action: (row: Person) => this.deletePerson(row)
      })
    }
    return action;
  }

  deletePerson(person: Person){
    this.peopleGrid.subscribe(res =>{
      let newListPeople = res.filter(x=> x.id != person.id);
      this.inifyPeopleSercvice.addedPeople =this.inifyPeopleSercvice.addedPeople.filter(x=> x.id != person.id);
      this.inifyPeopleSercvice.addedPeopleSource$.next(this.inifyPeopleSercvice.addedPeople);
      this.peopleGrid = of(newListPeople);
      this.peopleGridJson = newListPeople;
    });
  }

  submit(){
    this.modalConfirm.close();
    if(this.form.valid && this.inifyPeopleSercvice.addedPeople.length > 0){
      this.loadingService.setLoading(true);
      const idsPeopleAdded = this.inifyPeopleSercvice.addedPeople.map(x => {return x.id})
      this.inifyPeopleSercvice.addPeopleGroup(+this.groupPerson.value.split('-')[0], idsPeopleAdded).subscribe(res =>{
        this.peopleGrid.subscribe(res =>{
          this.loadingService.setLoading(false);
          res.forEach(x=>x.save = true);
          this.inifyPeopleSercvice.addedPeople = [];
          this.inifyPeopleSercvice.addedPeopleSource$.next(this.inifyPeopleSercvice.addedPeople);
          this.peopleGrid = of(res);
          this.peopleGridJson = res;
          this.router.navigate(['inify-people']);
        })
      });
    }
    else{
      this.toastr.error("Agregue nuevas personas a la unificación");
    }
    
  }
  
  handleSortedEvent(event) {

  }
}
