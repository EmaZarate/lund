import { Component, OnInit, ViewChild } from '@angular/core';
import { GridSettings, GridColumnFactoryService } from '@sc/portal.fe.lib.ui-core-components';
import { Observable, of } from 'rxjs';
import { Producer } from '../../models/Producer';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProducerManagementService } from '../../producer-management.service';
import { FilterTableProduceManagement } from '../../models/filterTableProducerManagement';
import { Router } from '@angular/router';
import { XlsExportService } from '../../../../shared/services/xls-export.service';

@Component({
  selector: 'app-producer-management-list',
  templateUrl: './producer-management-list.component.html',
  styleUrls: ['./producer-management-list.component.scss']
})
export class ProducerManagementListComponent implements OnInit {

  constructor(
    private gridFactory: GridColumnFactoryService,
    private fb: FormBuilder,
    private producerService: ProducerManagementService,
    private router: Router,
    private xlsExportService: XlsExportService
  ) { }

  @ViewChild('modalExport', {static: false})  modalExport: any;

  get allBusinessUnit () { return this.form.get('allbusinessunit');}
  get code() { return this.form.get('code');}
  get name() { return this.form.get('name')}

  settings: GridSettings;

  form: FormGroup;

  producer: Observable<Producer[]> = new Observable();
  producerJson:Producer[] = [];
  filter: FilterTableProduceManagement = {name : "", code: "", businessUnitId: parseInt(localStorage.getItem('businessUnitId'))};

  ngOnInit() {
    this.initializeTable();
    this.form = this.createForm();
    this.getData(this.filter);
  }

  getData(filter: FilterTableProduceManagement){
    this.producerService.getProducers(filter).subscribe(res =>{
      this.producerJson = res;
      this.producer = of(res);
      this.handleSortedEvent({id: 'produceName', criteria: 'ASC'});
   });
  }

  createForm(){
    return this.fb.group({
      allbusinessunit: [false],
      code: [''],
      name: ['']
    });
  }

  applyFilters(){
    var buid: number = parseInt(localStorage.getItem('businessUnitId'));

    if (this.allBusinessUnit.value==true)
      buid = 0;
      this.filter = {
        name: this.name.value,
        code: this.code.value,
        businessUnitId: buid
      }
      this.getData(this.filter);
  }

  deleteFilters(){
    this.filter = {
      name: "",
      code: "",
      businessUnitId: parseInt(localStorage.getItem('businessUnitId'))
    }
    this.name.patchValue("");
    this.code.patchValue("");
    this.allBusinessUnit.patchValue(false);
    this.getData(this.filter);
  }

  initializeTable(){
    this.settings = {
      columns: [
        this.gridFactory.actions({
          id: 'menu',
          header: 'Acciones',
          actions: [
            {
              label: 'Ver',
              icon: 'eye',
              action: (row: Producer) => this.goDetail(row),
            }
          ],
        }),
        this.gridFactory.value({
          id: 'originCode',
          header: 'Código',
          sortable: true,
          primaryValueGetter: (row: Producer) => { // You can use either a property or a callback
            return row.originCode;
          }
        }),
        this.gridFactory.value({
          id: 'businessUnit.description',
          header: 'Unidad de Negocio',
          maxLengthEllipsis: {
            maxlength: 3,
            length: 5
          },
          sortable: true,
          primaryValueGetter: (row: Producer) => { // You can use either a property or a callback
            return (row.businessUnit.description);
          }
        }),
        this.gridFactory.value({
          id: 'produceName',
          header: 'Nombre',
          sortable: true,
          maxLengthEllipsis: {
            maxlength: 3,
            length: 5
          },
          primaryValueGetter: (row: Producer) => { // You can use either a property or a callback
            return row.produceName;
          }
        }),
        this.gridFactory.value({
          id: 'mail',
          header: 'Email',
          sortable: true,
          maxLengthEllipsis: {
            maxlength: 3,
            length: 6
          },
          primaryValueGetter: (row: Producer) => { // You can use either a property or a callback
            return row.mail;
          }
        })
      ]
    }
  }

  goDetail(producer : Producer){
     this.router.navigate([`producer-management/${producer.id}`])
  }

  handleSortedEvent(event){
    const params: Array<any> =  this.getFields(event.id);
    if(event.criteria == "DESC"){
      this.producer = of(this.producerJson.sort((x, y) => { return this.functionOrder(y,x,params)}));
    }
    else{
      this.producer = of(this.producerJson.sort((x, y) => { return this.functionOrder(x,y,params) }));
    }
  }

  getFields(params){
    let paramsArray = params.split('.');
    return paramsArray;
  }

  functionOrder(x:Producer,y:Producer,params:Array<any>){
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

  gridExport(expFormat: string)
  {
    this.modalExport.close();

    var expTitle = 'ADMINISTRACIÓN DE PRODUCTORES';
    var expJson = []; 
    var expData = this.producerJson;

    for (let row of(expData)) {
      expJson.push({
        // INICIO: Declarar aqui el JSON de salida de exportación //
        'CODIGO': row.originCode,
        'UNIDAD DE NEGOCIO': row.businessUnit.description,
        'NOMBRE': row.produceName,                    
        'EMAIL': row.mail
        });
    }                                
    this.xlsExportService.exportToFile(expJson, expTitle, expFormat);
  }

}
