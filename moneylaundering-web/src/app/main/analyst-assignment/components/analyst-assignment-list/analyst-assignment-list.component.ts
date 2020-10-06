import { AuthService } from './../../../../core/services/auth.service';
import { LoadingService } from './../../../../core/services/loading.service';
import { SelectedCellService } from './../../../../shared/services/selected-cell.service';
import { DateFormat } from 'src/app/shared/dateFormat';
import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { GridSettings, GridColumnFactoryService, CheckboxModule } from '@sc/portal.fe.lib.ui-core-components';
import { SelectedCellComponent } from 'src/app/shared/components/selected-cell/selected-cell.component';
import { Case } from 'src/app/main/analyst-assignment/models/case.model';
import { AnalystAssignmentService } from 'src/app/main/analyst-assignment/analyst-assignment.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { appRoutes } from 'src/constants/app-routes';
import { FilterTableCaseManagement } from 'src/app/main/case-management/models/filterTableCaseManagement';
import { Observable, of, BehaviorSubject } from 'rxjs';
import * as moment from 'moment';
import { getLocaleDateTimeFormat } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { XlsExportService } from 'src/app/shared/services/xls-export.service';
import { GridComponent } from '@sc/portal.fe.lib.ui-core-components/lib/components/grid/grid.component';
import { finalize } from 'rxjs/operators';
import { IAnalystAssignment } from '../../models/analyst.model';

@Component({
  selector: 'app-analyst-assignment-list',
  templateUrl: './analyst-assignment-list.component.html',
  styleUrls: ['./analyst-assignment-list.component.scss']
})

export class AnalystAssignmentListComponent implements OnInit {

  @ViewChild('modalConfirm', {static: false})  modalConfirm: any;
  @ViewChild('modalExport', {static: false})  modalExport: any;
  @ViewChild('grid',{static: false}) grid: GridComponent; 

  gridSettings: GridSettings;
  cases: Observable<Case[]>;
  filter: FilterTableCaseManagement = new FilterTableCaseManagement();
  caseForm: FormGroup;
  formGrid: FormGroup;
  caseJson: Case[] = []; 
  canTakeCases: boolean = false;
  selectedCount: number = 0;
  successCount: number = 0;
  analystArray: IAnalystAssignment = new IAnalystAssignment();
     
  get caseNumber() {return this.caseForm.get("caseNumber");}
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gridFactory: GridColumnFactoryService,
    private analystAssignmentService: AnalystAssignmentService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private xlsExportService: XlsExportService,
    private cellService: SelectedCellService,
    private ldg: LoadingService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.ldg.setLoading(true);
    this.checkIfSelected();
    this.formCreate();
	  this.gridUnFilter();
    this.gridData();
    this.gridMap();

  }
  
  private checkIfSelected() {
    this.cellService.isSelected$
                    .subscribe((value) => {
                      if (this.countSelected(value)) {
                        this.canTakeCases = true; 
                      } else { this.canTakeCases = false; }
                    })
  }

  formCreate() 
  {
    this.caseForm =  this.fb.group({
      caseNumber: ['', Validators.maxLength(12)]
    });
  }

  gridData()
  {
    this.analystAssignmentService.getCases(this.filter).subscribe(resp => {

      this.cases = of(resp);
      this.caseJson = resp;
      this.ldg.setLoading(false);
      this.gridOrder();
      
    });
  }
  
  gridExport(expFormat: string)
  {
    this.modalExport.close();

    var expTitle = 'ASIGNACIÓN DE ANALISTA';
    var expJson = []; 
    var expData = [];

    this.cases.subscribe(resp => {
      expData = resp as Case[];
    })
    const date = new DateFormat();

    for (let row of(expData)) {
        expJson.push({
            // INICIO: Declarar aqui el JSON de salida de exportación //
            '#': (row.caseNumber),
            'PERSONA ASOCIADA': (row.person.cuit + " " + row.person.firstName + " " + row.person.lastName),
            'TIPO DE ALERTA': (row.caseType.description),
            'SUCURSAL': (row.branchOffice.description),
            'RIESGO': (row.risk.description),
            'FECHA': (date.format(row.createDate)),
            'DÍAS TRANSCURRIDOS': (moment(new Date()).diff(moment(row.createDate), 'days')),
            'VALORACIÓN': (this.currencyFormatDE(row.value))
            // FIN //
            });
    }                       
    this.xlsExportService.exportToFile(expJson, expTitle, expFormat);
  }

  gridMap() {
    
    this.gridSettings = {
      columns: [
        this.gridFactory.actions({
          id: 'menu',
          header: 'Acciones',
          actions: [ // You can use either a property or a callback (getActionsCallBack)
            {
              label: 'Ver',
              icon: 'eye',
              action: (row: any) => this.router.navigate(['/analyst-assignment', row.caseNumber, appRoutes.case.detail]),
            }
          ]
        }),
        this.gridFactory.component({
          id: 'id',
          header: 'Sel',
          columnClass: 'upload-invoice-grid__cells__select',
          componentClass: SelectedCellComponent
        }), 

        this.gridFactory.value({
          id: 'id',
          header: '#',
          primaryValueGetter: (row: any) => { 
            return row.caseNumber;
          }
        }),

        this.gridFactory.value({
          id: 'person',
          header: 'Persona Asociada',
          primaryValueGetter: (row: any) => { 
            return row.person.cuit + " " + row.person.firstName + " " + row.person.lastName;
          }
        }),
        
        this.gridFactory.value({
          id: 'caseType',
          header: 'Tipo de Alerta',
          maxLengthEllipsis: {
            maxlength: 3,
            length: 5
          },
          primaryValueGetter: (row: any) => {
            return row.caseType.description;
          }
        }),
        this.gridFactory.value({
          id: 'branchOffice',
          header: 'Sucursal',
          maxLengthEllipsis: {
            maxlength: 3,
            length: 5
          },
          primaryValueGetter: (row: any) => { 
            return row.branchOffice.description;
          }
        }),
        this.gridFactory.value({
          id: 'risk',
          header: 'Riesgo',
          maxLengthEllipsis: {
            maxlength: 3,
            length: 5
          },
          primaryValueGetter: (row: any) => { 
            return row.risk.description;
          }
        }),
        this.gridFactory.value({
          id: 'createDate',
          header: 'Fecha',
          maxLengthEllipsis: {
            maxlength: 3,
            length: 5
          },
          primaryValueGetter: (row: any) => {
            const date = new DateFormat();
            return date.format(row.createDate);
          }
        }),
        this.gridFactory.value({
          id: 'daysPassed',
          header: 'Días transcurridos',
          maxLengthEllipsis: {
            maxlength: 3,
            length: 5
          },
          primaryValueGetter: (row: any) => { 
            return (moment(new Date()).diff(moment(row.createDate), 'days'));
          }
        }),
        this.gridFactory.value({
          id: 'value',
          header: 'Valoración',
          maxLengthEllipsis: {
            maxlength: 3,
            length: 5
          },
          primaryValueGetter: (row: any) => { // You can use either a property or a callback
            return this.currencyFormatDE(row.value);
          }
        })
      ]
    }

  }

 currencyFormatDE(num) {
    return (
      num
        .toFixed(2)
        .replace('.', ',')
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    )
  }
  
  gridOrder() {  

    try
    {
      this.caseJson = this.caseJson.sort((x, y) => {   return (moment(new Date(x.createDate)).diff(moment(new Date), 'days') - moment(new Date(y.createDate)).diff(moment(new Date), 'days')) } );
    } catch {}

    this.caseJson.forEach(element => {

      if (element.news && element.status.warningDays != null) {
        if (moment(new Date(element.news.expirationDate)).diff(moment(new Date), 'days') > element.status.warningDays) {
          element.expirationDays = 1;
        }
        else if (moment(new Date(element.news.expirationDate)).diff(moment(new Date), 'days') <= element.status.warningDays) {
          element.expirationDays = 2;
        }
      }

      if (element.news) {
        if (new Date().getTime() > new Date(element.news.expirationDate).getTime()) {
          element.expirationDays = 3;
        }
      }
      else{
        element.expirationDays = 0;
      }
      if(element.status.finisher) element.expirationDays = 0;

    });

    this.caseJson = this.caseJson.sort((x, y) => { return y.expirationDays - x.expirationDays });
    this.cases = of(this.caseJson);
  }

  gridFilter() {

    var buid : number = parseInt(this.route.snapshot.params.id)
    buid = isNaN(buid) ? parseInt(localStorage.getItem('businessUnitId')) : buid;

    this.filter = {
      firstname: null,
      surname: null,
      cuit: null,
      numberCase: this.caseNumber.value,
      analist: null,
      risks: [],
      statuses: [1],
      caseTypes: [],
      businessUnitId: buid
    };
    
    this.gridData();
  }
  
  gridUnFilter()  
  {
    var buid: number = parseInt(localStorage.getItem('businessUnitId'));
    buid = isNaN(buid) ? 1 : buid;
    
    this.filter = {
      firstname: null,
      surname: null,
      cuit: null,
      numberCase: null,
      analist: null,
      risks: [],
      statuses: [1],
      caseTypes: [],

      businessUnitId: buid
    };

    this.caseNumber.patchValue('');
    this.gridData();
  }
  
  takeCases() {

    this.modalConfirm.close();
    var selected : number = 0;

    for(var i = 0; i < this.grid.items.length; i++)
    {
      if (this.grid.items[i].isSelected == true)
      {
          selected ++;

          var caseId: number = parseInt(this.grid.items[i].caseNumber);
          var businessUnitId: number = parseInt(localStorage.getItem('businessUnitId'));
          var observation: string = '';
          var newsReasonTypeId: number = 1;
          var analystId : string = this.getUserId()

          this.analystArray.newItem.push({caseId, businessUnitId, analystId})

      }

    }
    this.analystAssignmentService.analystAssignment(this.analystArray)
                                .subscribe(res => {
                                  if (res) {
                                    if (this.selectedCount >= 2) {
                                      this.toastr.success("Los casos han sido asignados correctamente.", "Éxito");
                                    }
                                    else { this.toastr.success("El caso ha sido asignado correctamente.", "Éxito") }
                                    this.gridUnFilter();
                                    this.gridData();
                                  }
                                });

    if (selected > 0)
    {
      this.formCreate();
      this.gridData(); 
    }
    
  }

  getUserId() {
    let userId: string
    this.authService.user$.subscribe(res => { 
      userId = res.userId
    })
    return userId
  }

  private countSelected(value: boolean) : number {
    if (value === true) {
      this.selectedCount++;
    }
    else { 
      this.selectedCount--;
    }
    return this.selectedCount;
  }
}