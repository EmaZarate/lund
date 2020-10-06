import { Component, OnInit, ViewChild } from '@angular/core';
import { GridColumnFactoryService, GridSettings } from '@sc/portal.fe.lib.ui-core-components';
import { Person } from 'src/app/main/person-management/models/person.model';
import { isUndefined } from 'util';
import { Observable, of } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PersonService } from "../../../person-management/person.service";
import { FilterTablePersonManagement } from 'src/app/main/person-management/models/filterTablePersonManagement';
import { SelectedCellComponent } from 'src/app/shared/components/selected-cell/selected-cell.component';
import { ToastrService } from 'ngx-toastr';
import { InifyPeopleService } from '../../inify-people.service';
import { Location } from '@angular/common';
import { LoadingService } from '../../../../core/services/loading.service';

@Component({
  selector: 'app-add-person-unification',
  templateUrl: './add-person-unification.component.html',
  styleUrls: ['./add-person-unification.component.scss']
})
export class AddPersonUnificationComponent implements OnInit {

  constructor(
    private gridFactory: GridColumnFactoryService,
    private fb: FormBuilder,
    private PersonService: PersonService,
    private toastr: ToastrService,
    private inifPeopleService: InifyPeopleService,
    private location: Location,
    private loadingService: LoadingService
    ) { }
  
  @ViewChild('grid',{static: false}) grid: any; 

  get cuit() {return this.form.get('cuit')}
  get firstname() {return this.form.get('firstname')}
  get surname() {return this.form.get('surname')}

  settings: GridSettings;
  people: Observable<Person[]> = of([]);
  peopleJson: Person[] = [];
  form: FormGroup;
  filter = new FilterTablePersonManagement();
  groupPerson: Person;

  ngOnInit() {
  this.form = this.createForm();
  this.initializeTable();
  this.inifPeopleService.groupPerson$.subscribe(res =>{
     this.groupPerson = res;
  })
  }

  createForm(){
    return this.fb.group({
      surname: [''],
      firstname:[''],
      cuit: [''],
    });
  }

  gridFilter(){
    this.loadingService.setLoading(true);
    let buid : number = parseInt(localStorage.getItem('businessUnitId'));
    buid = isNaN(buid) ? 1 : buid;        
    this.filter = {cuit: this.cuit.value,  fullName: this.firstname.value+this.surname.value, riskId: 0, tranBefore: '', tranAfter: '', orderId: 0, businessUnitId: buid, group: false , getWithoutGrouping: true, groupCode: 0};
    this.PersonService.getByFilter(this.filter).subscribe(res =>{
      const listPersonWithoutGroup = res.filter((value, index, arr)=>{ return value.id != this.groupPerson.id});
      if(listPersonWithoutGroup.length == 0) this.toastr.warning("No se encontraron personas con los filtros seleccionados");
      this.people = of(listPersonWithoutGroup);
      this.peopleJson = listPersonWithoutGroup;
      this.loadingService.setLoading(false);
    },
    error => {
      this.loadingService.setLoading(false);
    });
  }

  add() {
    let selected : number = 0;

    for(var i=0;i<this.grid.items.length;i++)
    {
      if (this.grid.items[i].isSelected == true)
      {
         selected++;
         this.grid.items[i].save = false;
         this.inifPeopleService.addedPeople.push(this.grid.items[i]);
         this.inifPeopleService.addedPeopleSource$.next(this.inifPeopleService.addedPeople);
      }
    }
    if(selected > 0){
      this.location.back();
    }
    else{
      this.toastr.error("Debe seleccionar al menos una persona.");
    }
  }

  cancel(){
    this.location.back();
  }

  initializeTable() {

    this.settings = {
      columns: [
        this.gridFactory.component({
          id: 'id',
          header: 'Agregar',
          columnClass: 'upload-invoice-grid__cells__select',
          componentClass: SelectedCellComponent
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
      ]
    };
  }

  gridUnFilter() {
    
  }

}
