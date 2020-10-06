import { LoadingService } from './../../../../core/services/loading.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { GridColumnFactoryService, GridSettings } from '@sc/portal.fe.lib.ui-core-components';
import { AnalystAssignmentService } from 'src/app/main/analyst-assignment/analyst-assignment.service';
import { Observable, of, forkJoin } from 'rxjs';
import { Case } from 'src/app/main/analyst-assignment/models/case.model';
import { Router, ActivatedRoute } from '@angular/router';
import { appRoutes } from 'src/constants/app-routes';
import { Person } from "src/app/main/case-management/models/person.model";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Status } from 'src/app/main/case-management/models/status';
import { CaseGroup } from 'src/app/main/case-management/models/caseGroup';
import { CaseType } from 'src/app/main/case-management/models/caseType';
import { FilterTableCaseManagement } from 'src/app/main/case-management/models/filterTableCaseManagement';
import * as moment from 'moment';
import { Risk } from 'src/app/main/case-management/models/risk.model';
import { ToastrService } from 'ngx-toastr';
import { DateFormat } from 'src/app/shared/dateFormat';
import { XlsExportService } from 'src/app/shared/services/xls-export.service';

@Component({
  selector: 'app-case-management-list',
  templateUrl: './case-management-list.component.html',
  styleUrls: ['./case-management-list.component.scss']
})
export class CaseManagementListComponent implements OnInit {

  @ViewChild('modalExport', {static: false})  modalExport: any;
  
  caseForm: FormGroup;
  settings: GridSettings;

  filter: FilterTableCaseManagement = new FilterTableCaseManagement();
  cases: Observable<Case[]> = new Observable();
  casesJson: Case[] = [];
  status: Status[];
  caseGroups: CaseGroup[];
  caseTypes: CaseType[];
  risks: Risk[] = [];
  person: Person[];
  analistItems= [];
  stateTypeItems = [{id:1, value: "No Finales"}, {id:2, value: "Finales"}, {id:3, value: "Todos"}];
  statusesItems: Status[] = [];
  caseGroupItems = [];
  caseTypeItems: CaseType[] = [];
  statusesWithoutNew: number[];
  
  get allBusinessUnit () { return this.caseForm.get('allbusinessunit');}
  get firstname() { return this.caseForm.get('firstname');}
  get surname() { return this.caseForm.get('surname')}
  get cuit() { return this.caseForm.get('cuit')}
  get case() { return this.caseForm.get('case')}
  get analist() {return this.caseForm.get('analist')}
  get stateType() { return this.caseForm.get('stateType')}
  get caseGroup() { return this.caseForm.get('caseGroup')}

  constructor(
    private gridFactory: GridColumnFactoryService,
    private activatedRoute: ActivatedRoute,
    private analystassignmentService: AnalystAssignmentService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private xlsExportService: XlsExportService,
    private loadingService: LoadingService
    ) { }

  ngOnInit() {
    this.loadingService.setLoading(true);
    this.getData();
    this.caseForm = this.createForm();

    this.stateType.valueChanges.subscribe(value => {
      this.statusesItems = this.filterState(value.value);
      this.createForm();
    });

    this.caseGroup.valueChanges.subscribe(value =>{
       this.caseTypeItems = this.filterCaseType(value.id);
       this.createForm();
    });

    this.stateType.setValue({id:1, value: "No Finales"})
    this.initializeTable();
    
  }

  orderCase(cases: Case[]) {
    try
    {
      cases = cases.sort((x, y) => {   return (moment(new Date(x.createDate)).diff(moment(new Date), 'days') - moment(new Date(y.createDate)).diff(moment(new Date), 'days')) } );
    } catch {}

    cases.forEach(element => {
      if (element.news && element.status.warningDays != null) {
        if (moment(new Date(element.news.expirationDate)).diff(moment(new Date), 'days') > element.status.warningDays) {
          element.expirationDays = 1;
        }
        else if (moment(new Date(element.news.expirationDate)).diff(moment(new Date), 'days') <= element.status.warningDays) {
          element.expirationDays = 2;
        }
      }


      if (element.news && !(element.news.expirationDate==null)) {
        if (new Date().getTime() > new Date(element.news.expirationDate).getTime()) {
          element.expirationDays = 3;
        }
      }
      else{
        element.expirationDays = 0;
      }
      if(element.status.finisher) element.expirationDays = 0;
    });

    cases = cases.sort((x, y) => { return y.expirationDays - x.expirationDays });
    return cases;
  }

  reOrder(): void {
    this.cases = of(this.orderCase(this.casesJson));
  }

  getData(): void {

    this.person = this.activatedRoute.snapshot.data['person'];
    this.analistItems = this.mapArrayItems(this.person, "id", "lastName", "firstName");
    this.risks = this.activatedRoute.snapshot.data['risks'];
    this.caseTypes = this.activatedRoute.snapshot.data['caseTypes'];
    this.caseGroups = this.activatedRoute.snapshot.data['caseGroup'];
    this.status = this.activatedRoute.snapshot.data['status'];
    this.status = this.status.filter(x => x.description != "Nuevo");
    this.statusesItems = this.status;
    this.statusesWithoutNew = this.status.map(x => {return x.id})
    this.filter.statuses = this.statusesWithoutNew;
    this.caseGroups.unshift({ id: 0, description: "Todos" });
    this.caseGroupItems = this.mapArrayItems(this.caseGroups, "id", "description");
    this.caseTypeItems = this.filterCaseType(0);
    
    var buid : number = parseInt(this.route.snapshot.params.id)
    buid = isNaN(buid) ? parseInt(localStorage.getItem('businessUnitId')) : buid;

    this.filter.businessUnitId =  buid;

    this.analystassignmentService.getCases(this.filter).
      subscribe(
        res => {
          res = this.orderCase(res);
          this.cases = of(res);
          console.log(res);
          this.casesJson = res;
          this.loadingService.setLoading(false);
        }
      );
  }

  filterState(state: string){
    switch (state) {
      case 'Todos':
        return this.status;
      case "Finales":
        return this.status.filter(x => x.finisher == true);
      case "No Finales":
        return this.status.filter(x => x.finisher == false);
      default:
        return [];
    }
  }

  filterCaseType(idCaseGroup){
    switch (idCaseGroup) {
      case 0:
        return this.caseTypes;
      default:
        return this.caseTypes.filter(x => x.caseGroupId == idCaseGroup);
    }
  }

  createForm(){
    let group = 
    {
      allbusinessunit: [false],
      firstname: ['', Validators.maxLength(300)],
      surname: ['', Validators.maxLength(300)],
      cuit: ['', Validators.maxLength(12)],
      case: [undefined,Validators.max(999999999)],
      analist:[''],
      stateType: [{id:1, value: "No Finales"}, Validators.required],
      caseGroup: [{id: 0, value:"Todos"}]
    };

    this.risks.forEach(risk =>{
      group['risk'+risk.id] = [false]
    });

    this.caseTypeItems.forEach(caseType =>{
       group['caseType'+caseType.id] = [false]
    });

    this.statusesItems.forEach(status =>{
      group['status'+status.id] = [false]
    })

    return this.fb.group(group);
  }

  mapArrayItems(array: any, id, ...value){
     return array.map(x => {return {id:x[id], value: value[1] != undefined ?  (x[value[0]] + " " + x[value[1]]) : x[value[0]] }})
  }

  applyFilters(){

    let risks: number[] = [];
    risks = this.searchControlsIDs(this.risks, 'risk')
    
    let caseTypes: number[] = [];
    caseTypes = this.searchControlsIDs(this.caseTypeItems, 'caseType')

    let status: number[] = [];
    status = this.searchControlsIDs(this.statusesItems, 'status')

    if(status.length == 0) status = this.statusesWithoutNew;

    var buid: number = parseInt(localStorage.getItem('businessUnitId'));

    if (this.allBusinessUnit.value==true)
      buid = 0;

    this.filter = {
      firstname: this.firstname.value,
      surname: this.surname.value,
      cuit: this.cuit.value,
      numberCase: this.case.value != null ? this.case.value : 0,
      analist: this.analist.value.id,
      risks: risks,
      statuses: status,
      caseTypes: caseTypes,
      businessUnitId: buid
    }

    this.analystassignmentService.getCases(this.filter).subscribe(cases => {
      if(cases.length == 0) this.toastr.error("No se encontraron casos");
       cases = this.orderCase(cases);
       this.cases = of(cases)
       this.casesJson = cases;
    });
  }

  searchControlsIDs(arrayItems: any[], itemName: string):number[]{
    let Ids: number[] = [];
    arrayItems.forEach(item => {
      if(this.caseForm.controls[itemName+item.id].value){
        Ids.push(item.id)
      }
    });
    return Ids;
  }

  deleteFilters(){
    
    var buid: number = parseInt(localStorage.getItem('businessUnitId'));

    this.filter = {
      firstname: '',
      surname: '',
      cuit: '',
      numberCase: 0,
      analist: 0,
      risks: [],
      statuses: this.statusesWithoutNew,
      caseTypes: [],
      businessUnitId: buid
    }

    this.setValueForm()
    //this.caseForm = this.createForm();
    this.analystassignmentService.getCases(this.filter).subscribe(cases =>{
      cases = this.orderCase(cases);
      this.cases = of(cases);
      this.casesJson = cases;
    });

    this.allBusinessUnit.patchValue(false);
  }

  setValueForm(){
    this.firstname.patchValue('');
    this.surname.patchValue('');
    this.cuit.patchValue('');
    this.case.patchValue(undefined);
    this.analist.patchValue('');
    this.stateType.patchValue({id:1, value: "No Finales"});
    this.caseGroup.patchValue({id: 0, value:"Todos"});
    
    this.setCheckboxInFalse(this.risks, 'risk');
    this.setCheckboxInFalse(this.caseTypes, 'caseType');
    this.setCheckboxInFalse(this.status, 'status');
  }

  setCheckboxInFalse(arrayItems: Array<any>, itemName: string){
    arrayItems.forEach(item => {
      this.caseForm.controls[itemName+item.id].patchValue(false);
    });
  }

  handleSortedEvent(event){
    const params: Array<any> =  this.getFields(event.id);
    if(event.criteria == "DESC"){
      this.cases = of(this.casesJson.sort((x, y) => { return this.functionOrder(y,x,params)}));
    }
    else{
      this.cases = of(this.casesJson.sort((x, y) => { return this.functionOrder(x,y,params) }));
    }
  }

  functionOrder(x:Case,y:Case,params:Array<any>){
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

  getFields(params){
    let paramsArray = params.split('.');
    return paramsArray;
  }

  setStyleRow(caseElement: Case){
     switch (caseElement.expirationDays) {
       case 1:
         return 'backGreen'
         break;
       case 2:
         return 'backYellow'
         break;
       case 3:
         return 'backRed'
         break;
       default:
         break;
     }
  }

  initializeTable(){
    this.settings = {
      rowCustomClass: (row: Case) => this.setStyleRow(row),
      columns: [
        this.gridFactory.actions({
          id: 'menu',
          header: 'Acciones',
          getActionsCallback: (row: Case) => this.setGridActions(row)
        }),
        this.gridFactory.value({
          id: 'caseNumber',
          header: '#',
          sortable: true,
          primaryValueGetter: (row: Case) => { // You can use either a property or a callback
            return row.caseNumber;
          }
        }),
        this.gridFactory.value({
          id: 'person.firstName',
          header: 'Persona Asociada',
          maxLengthEllipsis: {
            maxlength: 3,
            length: 5
          },
          sortable: true,
          primaryValueGetter: (row: Case) => { // You can use either a property or a callback
            return (row.person.cuit +" "+row.person.firstName +" "+ row.person.lastName);
          }
        }),
        this.gridFactory.value({
          id: 'analystId',
          header: 'Analista',
          sortable: true,
          maxLengthEllipsis: {
            maxlength: 3,
            length: 5
          },
          primaryValueGetter: (row: Case) => { // You can use either a property or a callback
            return row.analyst != null ? row.analyst.firstName +" "+ row.analyst.lastName : "";
          }
        }),
        this.gridFactory.value({
          id: 'caseType.description',
          header: 'Tipo Alerta',
          sortable: true,
          maxLengthEllipsis: {
            maxlength: 3,
            length: 6
          },
          primaryValueGetter: (row: Case) => { // You can use either a property or a callback
            return row.caseType.description;
          }
        }),
        this.gridFactory.value({
          id: 'branchOffice.description',
          header: 'Sucursal',
          sortable: true,
          maxLengthEllipsis: {
            maxlength: 3,
            length: 5
          },
          primaryValueGetter: (row: Case) => { // You can use either a property or a callback
            return row.branchOffice.description;
          }
        }) ,
        this.gridFactory.value({
          id: 'risk.id',
          header: 'Riesgo',
          sortable: true,
          maxLengthEllipsis: {
            maxlength: 3,
            length: 5
          },
          primaryValueGetter: (row: Case) => { // You can use either a property or a callback
            return row.risk.description;
          }
        }),
        this.gridFactory.value({
          id: 'createDate',
          header: 'Fecha',
          sortable: true,
          maxLengthEllipsis: {
            maxlength: 3,
            length: 5
          },
          primaryValueGetter: (row: Case) => { // You can use either a property or a callback
            const date = new DateFormat();
            return date.format(row.createDate);
          }
        }),
        this.gridFactory.value({
          id: 'daysPassed',
          header: 'Días Transcurridos',
          maxLengthEllipsis: {
            maxlength: 3,
            length: 5
          },
          primaryValueGetter: (row: Case) => { // You can use either a property or a callback
            return (moment(new Date()).diff(moment(row.createDate), 'days'));
          }
        }),
        this.gridFactory.value({
          id: 'status.description',
          header: 'Estado',
          sortable: true,
          maxLengthEllipsis: {
            maxlength: 3,
            length: 5
          },
          primaryValueGetter: (row: Case) => { // You can use either a property or a callback
            return row.status.description;
          }
        }),
        this.gridFactory.value({
          id: 'row.news.expirationDate',
          header: 'Vencimiento Estado',
          maxLengthEllipsis: {
            maxlength: 3,
            length: 5
          },
          primaryValueGetter: (row: Case) => { // You can use either a property or a callback
            var result: string = '';
            if (row.news != null && row.news.expirationDate != null)
            {
              var dd : Date = new Date(row.news.expirationDate);
              if (dd.getUTCFullYear()>1)
              {
                const date = new DateFormat();
                result = date.format(row.news.expirationDate);
              }
            }
            return  result;
          }
        }),
        this.gridFactory.value({
          id: 'row.news.expirationDate.Days',
          header: 'Días Remanentes',
          maxLengthEllipsis: {
            maxlength: 3,
            length: 5
          },
          primaryValueGetter: (row: Case) => { // You can use either a property or a callback
            var result: string = '';
            if (row.news != null && row.news.expirationDate != null)
            {
              var dd : Date = new Date(row.news.expirationDate);
              if (dd.getUTCFullYear()>1)
                result =  moment(new Date(row.news.expirationDate)).diff(moment((new Date).setHours(0,0,0,0)), 'days').toString();
            }
            return  result;
          }
        }),
        this.gridFactory.value({
          id: 'businessUnit.description',
          header: 'Negocio',
          maxLengthEllipsis: {
            maxlength: 3,
            length: 5
          },
          primaryValueGetter: (row: Case) => { // You can use either a property or a callback
            return row.businessUnit.description;
          }
        }),
        this.gridFactory.value({
          id: 'value',
          header: 'Valoración',
          sortable: true,
          maxLengthEllipsis: {
            maxlength: 3,
            length: 5
          },
          primaryValueGetter: (row: Case) => { // You can use either a property or a callback
            return this.currencyFormatDE(row.value);
          }
        }),
      ]
    }
  }

  setGridActions(row: Case) : Array<any>{
    const action = [];

    if(this.checkCanView(row)){
      action.push({
        label: 'Ver',
        icon: 'eye',
        action: (row) => this.router.navigate(['/case-management', row.caseNumber, appRoutes.case.detail]),
      })
    }

    if(this.checkCanrequestInformation(row)){
      action.push({
       label: 'Recepción de información',
       icon: 'emision_proceso',
       action: (row: any) => {
         this.router.navigate(['/case-management', row.caseNumber, appRoutes.case.requestInformation]);
       }
     });
   }
   
    if (this.checkCanReassingAnalyst(row)) {
      action.push({
        label: 'Reasignar analista',
        icon: 'refresh',
        action: (row) => this.router.navigate(['/analyst-re-assignment', row.caseNumber, appRoutes.case.detail])
      })
    }

    if(this.checkCanInfoRequirement(row)){
      action.push({
        label: 'Requerimiento de información',
        icon: 'cotiz_proceso',
        action: (row: any) => this.router.navigate(['/case-info-requirement', row.caseNumber, appRoutes.case.detail])

      })
    }

    if(this.checkCanReject(row)){
      action.push({
        label: 'Desestimar',
        icon: 'trash',
        action: (row: any) => this.router.navigate(['/case-underestimating', row.caseNumber, appRoutes.case.detail])
      })
    }

    if(this.checkCanFalsePositive(row)){
      action.push({
        label: 'Falso positivo',
        icon: 'close-elipse',
        action: (row) => this.router.navigate(['/fake-possitive', row.caseNumber, appRoutes.case.edit])
      })
    }

    if(this.checkCanChangeExpirationDate(row)){
      action.push({
        label: 'Cambiar vencimiento',
        icon: 'calendar',
        action: (row) => this.router.navigate(['/change-expiration', row.caseNumber, appRoutes.case.edit])
      })}
      

    if(this.checkCanReferToHigherInstance(row)){
      action.push({
        label: 'Derivar a instancia superior',
        icon: 'arrow-up-dropdown',
        action: (row: any) => this.router.navigate(['case-higher-instance-derivation', row.caseNumber, appRoutes.case.detail])
      })
    }

    if(this.checkCanReturnAnalyst(row)){
      action.push({
        label: 'Devolver a analista',
        icon: 'arrow-left-big',
        action: (row: any) => this.router.navigate(['/analyst-devolution', row.caseNumber, appRoutes.case.detail])
      })
    }

    if(this.checkCanReferToComplianceOfficer(row)){
      action.push({
        label: 'Derivar a oficial de cumplimiento',
        icon: 'arrow-left',
        action: (row: any) => {
          alert('Derivar a oficial de cumplimiento');
        }
      })
    }

    if(this.checkCanFinish(row)){
      action.push({
        label: 'Finalizar',
        icon: 'check',
        action: (row: any) => this.router.navigate(['/case-ending', row.caseNumber, appRoutes.case.detail])
      })
    }
    return action;
  }

  checkCanView(rowCase:Case){
    return true;
  }

  checkCanReassingAnalyst(rowCase:Case){
    if(!rowCase.status.finisher) return true;
    return false;
  }

  checkCanrequestInformation(rowCase:Case){
    // if(rowCase.status.id == 6 || rowCase.status.id == 7 || rowCase.status.id == 8) return true;
    if(rowCase.status.id == 7) return true;
    return false;
  }

  checkCanRegisterRecept(rowCase:Case){
    if(rowCase.status.id == 7) return true;
    return false;
  }
  checkCanInfoRequirement(rowCase:Case){
    if(rowCase.status.id == 6 || rowCase.status.id == 7 || rowCase.status.id == 8) return true;
    return false;
  }
  checkCanReject(rowCase:Case){
    if(rowCase.status.id == 6 || rowCase.status.id == 7 || rowCase.status.id == 8 || rowCase.status.id == 10) return true
    return false;
  }

  checkCanFalsePositive(rowCase:Case){
    if(rowCase.status.id == 6) return true;
    return false;
  }

  checkCanChangeExpirationDate(rowCase:Case){
    if(rowCase.status.id == 6 || rowCase.status.id == 7 || rowCase.status.id == 8) return true;
    return false;
  } 

  checkCanReferToHigherInstance(rowCase:Case){
    if(rowCase.status.id == 6 || rowCase.status.id == 7 || rowCase.status.id == 8) return true;
    return false;
  }

  checkCanReturnAnalyst(rowCase:Case){
    if(rowCase.status.id == 10 || rowCase.status.id == 9) return true;
    return false;
  }

  checkCanReferToComplianceOfficer(rowCase:Case){
    if(rowCase.status.id == 10) return true;
    return false;
  }

  checkCanFinish(rowCase:Case){
    if(rowCase.status.id == 9) return true;
    return false;
  }

  checkCanExport(rowCase:Case){
    return true;
  }

  currencyFormatDE(num) {
    return (
      num
        .toFixed(2)
        .replace('.', ',')
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    )
  }

  gridExport(expFormat: string)
  {
    this.modalExport.close();

    var expTitle = 'ADMINISTRACIÓN DE CASOS';
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
            'PERSONA ASOCIADA': (row.person.firstName + " " + row.person.lastName),
            'ANALISTA': (row.analyst.firstName + " " + row.analyst.lastName),
            'TIPO DE ALERTA': (row.caseType.description),
            'SUCURSAL': (row.branchOffice.description),
            'RIESGO': (row.risk.description),
            'FECHA': 	(date.format(row.createDate)),
            'DÍAS TRANSCURRIDOS': (moment(new Date()).diff(moment(row.createDate), 'days')),
            'ESTADO': (row.status.description),
            'VENCIMIENTO ESTADO': (row.news != null && row.news.expirationDate != null ? new Date(row.news.expirationDate).toLocaleDateString() : ""),
            'DÍAS REMANENTES': (row.news != null  && row.news.expirationDate != null ? moment(new Date(row.news.expirationDate)).diff(moment(new Date), 'days') : ""),
            'NEGOCIO': (row.businessUnit.description),                    
            'VALORACIÓN': (this.currencyFormatDE(row.value))
            // FIN //
            });
    }                                
    this.xlsExportService.exportToFile(expJson, expTitle, expFormat);
  }
}
