import { apiRoutes } from 'src/constants/api-routes';
import { LoadingService } from 'src/app/core/services/loading.service';
import { BoolToNumberMap } from './../../../../shared/boolToNumberMap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GrayListService } from './../../services/gray-list.service';
import { BoolConverter } from '../../scripts/YesNoBoolConverter';
import { DateFormat } from './../../../../shared/dateFormat';
import { FilterTablePersonManagement } from 'src/app/main/person-management/models/filterTablePersonManagement';
import { PersonService } from './../../../person-management/person.service';
import { GridSettings, GridColumnFactoryService, PaginationOptions, PaginationInfo } from '@sc/portal.fe.lib.ui-core-components';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { appRoutes } from 'src/constants/app-routes';
import { Observable, of } from 'rxjs';
import { Person } from 'src/app/main/person-management/models/person.model';
import { GrayList } from '../../models/gray-list.model';
import { GrayListFilter } from '../../models/gray-list-filter.model';
import { Pagination } from 'src/app/shared/models/pagination.model';
import { PaginationService, PaginationFunctions } from 'src/app/shared/services/pagination.service';

@Component({
  selector: 'app-gray-list-grid',
  templateUrl: './gray-list-grid.component.html',
  styleUrls: ['./gray-list-grid.component.scss']
})
export class GrayListGridComponent implements OnInit {

  settings: GridSettings;
  grayListPerson: Observable<GrayList[]> = new Observable();
  grayListPersonArray: GrayList[] = [];
  filter: GrayListFilter;
  filterForm: FormGroup;
  disabledApply: boolean = false;

  getLengthPath: string = `${apiRoutes.grayList.base}/length`;
  pf: PaginationFunctions = new PaginationFunctions();
  paginationFilter: Pagination;
  totalLength: number = 0;
  actualPage: number;
  actualItemsPerPage: number;
  itemsPerPage = [
    new PaginationOptions({
      key: 5,
      value: 5
    }),
    new PaginationOptions({
      key: 10,
      value: 10
    }),
    new PaginationOptions({
      key: 15,
      value: 15
    })
  ];

  get cuit() { return this.filterForm.get('cuit') }
  get fullName() { return this.filterForm.get('fullName') }
  get active() { return this.filterForm.get('active') }

  constructor(private router: Router, 
              private ldg: LoadingService,
              private grayListService: GrayListService,
              private paginationService: PaginationService,
              private gridFactory: GridColumnFactoryService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.ldg.setLoading(true);
    this.formInit();
    this.initializeGrid();
  }

  // Initial config
  
  formInit(): void {
    this.filterForm = this.fb.group({
      cuit: ['', [Validators.maxLength(12)]],
      fullName: ['', [Validators.maxLength(300)]],
      active: [1]
    });
    this.checkFormValidation();
  }

  getLength(): Observable<number> {
    this.gridFilter();
    // In the API, this method just listens to the CUIT, fullName and active filter //
    return this.paginationService.getLength(this.filter, this.getLengthPath)
  }

  getData(): void {
    this.gridFilter();
    // In the API, this method listens to the itemsPerPage & actualPage filter too // 
    this.grayListService.getGrayListPersons(this.filter)
                        .subscribe(res => {
                          this.grayListPerson = of(res);
                          this.grayListPersonArray = res;
                          this.ldg.setLoading(false);
                        });
  }

  getFilteredList(): void {
    this.getLength()
        .subscribe(length => {
          this.totalLength = length;
          this.getData();
        });
  }

  gridFilter(): void {
    let cnvrt = new BoolToNumberMap();
    this.paginationFilter = {
      itemsPerPage: this.actualItemsPerPage,
      actualPage: this.actualPage
    }
    this.filter = {
      cuit: this.cuit.value,
      fullName: this.fullName.value,
      active: cnvrt.numberToBoolMap(this.active.value),
      pagination: this.paginationFilter
    }
  }

  gridFilterClear(): void {
    this.formInit();
    this.getFilteredList();
  }

  checkFormValidation(): void {
    this.filterForm.valueChanges.subscribe(() => {
      if (this.filterForm.valid) {
        this.disabledApply = false;
      }
      else {
        this.disabledApply = true;
      }
    })
  }

  // Sorting methods //

  handleSortedEvent(event): void {
    console.log(event);
    const params: Array<any> =  this.getFields(event.id);
    if(event.criteria == "DESC"){
      this.grayListPerson = of(this.grayListPersonArray.sort((x, y) => { return this.functionOrder(y,x,params)}));
    }
    else{
      this.grayListPerson = of(this.grayListPersonArray.sort((x, y) => { return this.functionOrder(x,y,params) }));
    }
  }

  getFields(params): any {
    let paramsArray = params.split('.');
    return paramsArray;
  }

  functionOrder(x: GrayList, y: GrayList, params: Array<any>): number {
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

  // Grid config //

  initializeGrid(): void {
    this.settings = {
      columns: [
        this.gridFactory.actions({
          id: '',
          header: 'Acciones',
          getActionsCallback: (row: GrayList) => this.gridActions(row)
        }),
        this.gridFactory.value({
          id: 'id',
          header: '#',
          sortable: true,
          primaryValueGetter: (row: GrayList) => { 
            return row.id;
          }
        }),
        this.gridFactory.value({
          id: 'person.cuit',
          header: 'Cuit',
          sortable: true,
          primaryValueGetter: (row: GrayList) => { 
            return row.person.cuit;
          }
        }),
        this.gridFactory.value({
          id: 'person.lastName',
          header: 'Nombre',
          sortable: true,
          primaryValueGetter: (row: GrayList) => {
            return row.person.firstName + ' '+ row.person.lastName;
          }
        }),
        this.gridFactory.value({
          id: 'creationDate',
          header: 'Fecha',
          sortable: true,
          primaryValueGetter: (row: GrayList) => {
            let date = new DateFormat();
            return date.format(row.creationDate);
          }
        }),
        this.gridFactory.value({
          id: 'active',
          header: 'Activo',
          primaryValueGetter: (row: GrayList) => {
            let value = new BoolConverter();
            return value.boolConverter(row.active);
          }
        })
      ]
    }
  }

  gridActions(row: any): Array<any> {
    const actions = [];
    actions.push(
      {
        label: 'Ver',
        icon: 'eye',
        action: (row) => this.router.navigate(['/gray-list', row.id, 'detail']),
      },
      {
        label: 'Editar',
        icon: 'edit',
        action: (row) => this.router.navigate(['/gray-list', row.id, 'edit']),
      },
      {
        label: 'Desactivar',
        icon: 'close-elipse-flat',
        action: (row) => this.router.navigate([]),
      }
    )

    return actions;
  }

  // Event listeners // 

  onPageChange(event: PaginationInfo): void {
    // Because this executes and the paginator does not have totalPages //
    // The if statement executes at least once and sets the totalLength //
    if (event.totalPages == 0) {
        this.getLength().subscribe(length => {
          this.totalLength = length;
      });
    }
    // The next time it executes, it has everything to get the data // 
    else {
      this.actualItemsPerPage = this.pf.setActualItemsPerPage(event.itemsPage);
      this.actualPage = this.pf.setActualPage(event.actualPage);
      this.getData();
    }
  }

  // Routing methods // 

  onNew(): void {
    this.router.navigate(['/gray-list', 'new'])
  }

}
