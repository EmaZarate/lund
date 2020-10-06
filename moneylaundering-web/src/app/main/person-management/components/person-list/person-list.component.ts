import { Risk } from './../../models/risk.model';
import { PaginationService } from './../../../../shared/services/pagination.service';
import { LoadingService } from './../../../../core/services/loading.service';
import { Component, OnInit,ViewChild } from '@angular/core';
import { GridColumnFactoryService, GridSettings, PaginationOptions, PaginationInfo } from '@sc/portal.fe.lib.ui-core-components';
import { Observable, of } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Person } from "src/app/main/person-management/models/person.model";
import { PersonService } from "src/app/main/person-management/person.service";
import { RiskService } from "src/app/main/person-management/risk.service";
import { FilterTablePersonManagement } from 'src/app/main/person-management/models/filterTablePersonManagement';
import { appRoutes } from 'src/constants/app-routes';
import { ToastrService } from 'ngx-toastr';
import { XlsExportService } from 'src/app/shared/services/xls-export.service';
import { apiRoutes } from 'src/constants/api-routes';
import { PaginationFunctions } from 'src/app/shared/services/pagination.service';
import { Pagination } from 'src/app/shared/models/pagination.model';

@Component({
  selector: "app-person-list",
  templateUrl: "./person-list.component.html",
  styleUrls: ["./person-list.component.scss"],
})

export class PersonListComponent implements OnInit {

  @ViewChild('modalExport', {static: false})  modalExport: any;

  filter: FilterTablePersonManagement = new FilterTablePersonManagement();
  orderItem = [{key: 0, value: 'Apellido + Nombre'},{key: 1, value: 'Codigo'},{key: 2, value: 'CUIT'}];
  person: Observable<Person[]> = new Observable();
  personForm: FormGroup;
  personJson: Person[] = [];    
  riskItem: Risk[] = [];
  riskId: number; 
  settings: GridSettings;

  getLengthPath: string = `${apiRoutes.person.base}/length`;
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

  get allBusinessUnit () { return this.personForm.get('allbusinessunit');}  
  get cuit() {return this.personForm.get("cuit");}
  get fullName() {return this.personForm.get("fullName");}
  get riskSelect() {return this.personForm.get("riskSelect");}
  get tranBefore() {return this.personForm.get("tranBefore");}
  get tranAfter() {return this.personForm.get("tranAfter");}
  get orderSelect() {return this.personForm.get("orderSelect");}
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gridFactory: GridColumnFactoryService,
    private personService: PersonService,
    private paginationService: PaginationService,
    private riskService: RiskService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private xlsExportService: XlsExportService ,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.loadingService.setLoading(true)
    this.getRisk();
    this.formCreate();
    this.onRiskChange();
    this.gridMap();
  }

  getRisk() {
    this.riskService.getAll().subscribe(resp => {        
      this.riskItem.push({id: 0, description: 'Todos'});
      // {key: 0, value: 'Todos'}
      for (var i = 0; i < resp.length; i++) {
        this.riskItem.push({id: resp[i]['id'], description: resp[i]['description']});
      }
    });
  }

  formCreate() {
    this.personForm = this.fb.group({
      allbusinessunit: [false],      
      cuit: ['', Validators.maxLength(12)],
      fullName: ['', Validators.maxLength(300)],      
      riskSelect: 0,
      tranBefore: ['', Validators.max(999)],
      tranAfter: ['', Validators.max(999)],
      orderSelect: 0
    });
  }

  onRiskChange(): void {
    this.riskSelect.valueChanges.subscribe((risk: Risk) => {
      this.riskId = risk.id;
    })
  }

  // On change event handler //

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
      this.gridData();
    }
  }

  // Pagination config //
  
  getLength(): Observable<number> {
    this.gridFilter();
    // In the API, this method just listens to the CUIT, fullName and active filter //
    return this.paginationService.getLength(this.filter, this.getLengthPath)
  }

  // Filter methods //

  gridFilter() {
    
    let buid: number = parseInt(localStorage.getItem('businessUnitId'));
    buid = isNaN(buid) ? 1 : buid;

    this.paginationFilter = {
      itemsPerPage: this.actualItemsPerPage,
      actualPage: this.actualPage
    }

    if (this.allBusinessUnit.value == true) buid = 0;

    this.filter = {
      cuit: this.cuit.value,
      fullName: this.fullName.value,
      riskId: this.riskId,
      tranBefore: this.tranBefore.value,
      tranAfter: this.tranAfter.value,
      group: false,
      businessUnitId: buid,
      getWithoutGrouping: false,
      groupCode: 0,
      orderId: this.orderSelect.value.key,
      pagination: this.paginationFilter
    };

  }

  gridUnFilter() {

    let buid: number = parseInt(localStorage.getItem('businessUnitId'));
    buid = isNaN(buid) ? 1 : buid;

    this.filter = {
      cuit: '',
      fullName: '',
      riskId: 0,
      tranBefore: '',
      tranAfter: '',
      group: false,
      businessUnitId: buid,
      getWithoutGrouping: false,
      groupCode: 0,
      orderId: 0,
    };

    this.resetForm();
    this.getFilteredList();
  }

  // Form reset //

  private resetForm(): void {
    this.allBusinessUnit.patchValue(false);
    this.cuit.patchValue('');
    this.fullName.patchValue('');
    this.riskSelect.patchValue(this.riskItem[0].id);
    this.tranBefore.patchValue('');
    this.tranAfter.patchValue('');
    this.orderSelect.patchValue(this.orderItem[0]);
  }

  // Get data method // 

  getFilteredList(): void {
    this.getLength()
        .subscribe(length => {
          this.totalLength = length;
          this.gridData();
        });
  }

  gridData() {
    this.gridFilter();
    this.personService.getByFilter(this.filter).subscribe(resp => {
      this.person = of(resp);
      this.personJson = resp;
      this.gridOrder();
      this.loadingService.setLoading(false)
    });
  }

  // Order method // 
  
  gridOrder() {    

    var orderby = 1;

    if (this.orderSelect.value!=undefined)
      orderby = this.orderSelect.value.key;

    switch (orderby)
    {
      case 0:
        this.personJson.sort((left, right): number => 
        {return (left.lastName+' '+left.firstName < right.lastName+' '+right.firstName) ? -1 : 1;});
        break;

      case 1:
        this.personJson.sort(function(a, b)
        {return a.id - b.id;});
        break;

      case 2:
        this.personJson.sort((left, right): number => 
        {return (left.cuit < right.cuit) ? -1 : 1;});
        break;
  
      default: 
        this.personJson.sort((left, right): number => 
        {return (left.lastName+' '+left.firstName < right.lastName+' '+right.firstName) ? -1 : 1;});
        break;
    }

    this.person = of(this.personJson);
  }

  // Grid Export // 

  gridExport(expFormat: string) {
    this.modalExport.close();

    var expTitle = 'ADMINISTRACIÓN DE PERSONAS';
    var expJson = []; 
    var expData = [];

    this.person.subscribe(person => {
      expData = person as Person[];
    })

    for (let row of(expData)) {
      expJson.push({
        // INICIO: Declarar aqui el JSON de salida de exportación //
        'CÓDIGO': row.id,
        'CUIT': row.cuit,
        'APELLIDO': row.lastName,                    
        'NOMBRE': row.firstName,
        'PERFIL TRANSACCIONAL': row.personBusinessUnits[0].assignedRisk,
        'RIESGO':  row.personBusinessUnits[0].risk.description,
        'LISTA GRIS': (row.grayLists==null ? 'Si' : 'No'),
        'PEP': (row.pep==true ? 'Si' : 'No'),
        'TERRORISTA': (row.terrorist==true ? 'Si' : 'No'),
        'TERCERO': (row.thirdParty==true ? 'Si' : 'No'),
        'AGRUPADOR': (row.groupCode!=null ? 'Si' : 'No'),
        'DUPLICADO': (row.group!=null ? 'Si' : 'No')
        // FIN //
        });
    }                                
    this.xlsExportService.exportToFile(expJson, expTitle, expFormat);
  }

  // Grid configuration

  gridMap() {

    this.settings = {
      columns: [
        this.gridFactory.actions({
          id: "menu",
          header: "Acciones",
          actions: [
            {
              label: 'Ver',
              icon: 'eye',
              action: (row: any) => 
              {
                this.router.navigate(['/person-management', row.id, appRoutes.person.detail]);
              }
            },
            {
              label: 'Editar',
              icon: 'edit',
              action: (row: any) => this.router.navigate(['/person-management', row.id, appRoutes.person.edit]),
            }
          ],
        }),
        this.gridFactory.value({
          id: "",
          header: "Código",
          primaryValueGetter: (row: any) => {
            return (row.id);
          },
        }),
        this.gridFactory.value({
          id: "",
          header: "CUIT",
          primaryValueGetter: (row: any) => {
            return (row.cuit);
          },
        }),        
        this.gridFactory.value({
          id: "",
          header: "Apellido",
          primaryValueGetter: (row: any) => {
            return row.lastName;
          },
        }),        
        this.gridFactory.value({
          id: "",
          header: "Nombre",
          primaryValueGetter: (row: any) => {
            return row.firstName;
          },
        }),
        this.gridFactory.value({
          id: "",
          header: "Perfil Transaccional",
          primaryValueGetter: (row: any) => {
            return (row.personBusinessUnits[0].financialProfile);
          },
        }),
        this.gridFactory.value({
          id: "",
          header: "Riesgo",
          primaryValueGetter: (row: any) => {
            return (row.personBusinessUnits[0].risk.description);
          },
        }),
        this.gridFactory.value({
          id: "",
          header: "Lista Gris",
          primaryValueGetter: (row: any) => {
            debugger;
            if(row.grayLists.length>0){
              for (var i=0;i<row.grayLists.length;i++){
                return row.grayLists[i].active  === true ? "Si" : "No";
              }
            }else{
              return "No";

            }
          },
        }),
        this.gridFactory.value({
          id: "",
          header: "PEP",
          primaryValueGetter: (row: any) => {
            return (row.pep==true ? 'Si' : 'No');
          },
        }),
        this.gridFactory.value({
          id: "",
          header: "Terrorista",
          primaryValueGetter: (row: any) => {
            return (row.terrorist==true ? "Si" : "No");
          },
        }),
        this.gridFactory.value({
          id: "",
          header: "Tercero",
          primaryValueGetter: (row: any) => {
            return (row.thirdParty==true ? "Si" : "No");
          },
        }),
        this.gridFactory.value({
          id: "",
          header: "Agrupador",
          primaryValueGetter: (row: any) => {
            return (row.group === true ? "Si" : "No");
          },
        }),
        this.gridFactory.value({
          id: "",
          header: "Duplicado",
          primaryValueGetter: (row: any) => {

            return (row.groupCode !=null && row.groupCode > 0 ? "Si" : "No");
          },
        })
      ],
    };
  }
}
