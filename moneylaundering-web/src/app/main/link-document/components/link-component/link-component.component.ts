import { Component, OnInit } from '@angular/core';
import { LinkComponentService } from '../../link-component.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GridColumnFactoryService, GridSettings } from '@sc/portal.fe.lib.ui-core-components';
import { LoadingService } from 'src/app/core/services/loading.service';
import { Observable, of } from 'rxjs';
import { DocumentAttached } from 'src/app/shared/models/document-attached.model';
import { CaseDocument } from '../../models/caseDocument';
import { Location } from '@angular/common';

@Component({
  selector: 'app-link-component',
  templateUrl: './link-component.component.html',
  styleUrls: ['./link-component.component.scss']
})
export class LinkComponentComponent implements OnInit {

  constructor(
    private linkComponentService: LinkComponentService,
     private route: ActivatedRoute,
     private gridFactory: GridColumnFactoryService,
     private location: Location,
     private loadingService: LoadingService
     ) { }

  settings: GridSettings;
  documents: Observable<DocumentAttached[]> = of([]);
  documentsList: DocumentAttached[] = [];

  idPerson: number;
  idCase: number;
  
  ngOnInit() {
    this.initGrid();
    this.idPerson = +this.route.snapshot.paramMap.get('idPerson');
    this.idCase = +this.route.snapshot.paramMap.get('idCase');
    this.loadingService.setLoading(true);
    this.linkComponentService.getDocumentsWithoutCase(this.idPerson).subscribe(res =>{
      this.documents = of(res);
      this.documentsList = res;
      this.loadingService.setLoading(false);
    });
  }

  private initGrid() {
    this.settings = {
      columns: [
        this.gridFactory.actions({
          id: 'menu',
          header: 'ACCIONES',
          actions: [
            {
              label: 'Vincular',
              icon: 'emision_proceso',
              action: (row: DocumentAttached) => this.linkDocument(row),
            }
          ],
        }),
        this.gridFactory.value({
          id: 'documentId',
          header: '#',
          primaryValueGetter: (row: any) => { // You can use either a property or a callback
            return row.documentId;
          }
        }),
        this.gridFactory.value({
          id: 'versionId',
          header: 'Versión',
          primaryValueGetter: (row: any) => { // You can use either a property or a callback
            return row.versionId;
          }
        }),
        this.gridFactory.value({
          id: 'logicName',
          header: 'Nombre',
          primaryValueGetter: (row: any) => { // You can use either a property or a callback
            return row.logicName;
          }
        }),
        this.gridFactory.value({
          id: 'documentTypeDescription',
          header: 'Tipo',
          primaryValueGetter: (row: any) => { // You can use either a property or a callback
            return row.documentTypeDescription;
          }
        }),
        this.gridFactory.value({
          id: 'createDate',
          header: 'Fecha',
          primaryValueGetter: (row: any) => { // You can use either a property or a callback
            return new Date(row.createDate).toLocaleDateString();
          }
        }),
        this.gridFactory.value({
          id: 'expiration',
          header: 'Vencimiento',
          primaryValueGetter: (row: any) => { // You can use either a property or a callback
            return (new Date(row.expiration).toLocaleDateString() !== "1/1/1" ? new Date(row.expiration).toLocaleDateString() : "");
          }
        })
      ],
    };
  }

  back(){
    this.location.back();
  }

  linkDocument(document: DocumentAttached){
    this.loadingService.setLoading(true);
    let caseDocument: CaseDocument = new CaseDocument();
    caseDocument.caseId = this.idCase;
    caseDocument.businessUnitId = 1;
    caseDocument.documentId = document.documentId;
    this.linkComponentService.linkDocument(caseDocument).subscribe(res =>{
      this.loadingService.setLoading(false);
       this.documents.subscribe(docs =>{
         const newListDocuments = docs.filter(x => x.documentId != document.documentId);
         this.documents = of(newListDocuments);
       })
    });
  }

}
