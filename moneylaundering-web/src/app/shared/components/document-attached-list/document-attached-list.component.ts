import { DocumentAttached } from './../../models/document-attached.model';
import { UploadService } from './../upload-new-document/service/upload.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, Input, Output, Inject, SimpleChanges, OnChanges } from '@angular/core';
import { GridSettings, GridColumnFactoryService } from '@sc/portal.fe.lib.ui-core-components';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { EventEmitter } from '@angular/core';
import { DocumentAttachedService } from './document-attached.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-document-attached-list',
  templateUrl: './document-attached-list.component.html',
  styleUrls: ['./document-attached-list.component.scss']
})
export class DocumentAttachedListComponent implements OnInit, OnChanges {
  settings: GridSettings;
  form: FormGroup;
  @Input() documents: Observable<DocumentAttached[]> = of([]);
  @Input() documentsList: DocumentAttached[] = [];
  @Input() caseID: number;
  @Input() personID: number;
  @Output() onDelete: EventEmitter<any> = new EventEmitter();
  @Output() onNewDocument: EventEmitter<any> = new EventEmitter();
  @Output() onNewVersion: EventEmitter<any> = new EventEmitter();
  @Output() onLink: EventEmitter<any> = new EventEmitter();
  @Input() show: boolean = true;
  @Input() showLink: boolean = false;
  document: DocumentAttached = null;
  isNewDocumentOpen = false;

  constructor(
    private gridFactory: GridColumnFactoryService,
    private router: Router,
    private documentService: DocumentAttachedService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private uploadService: UploadService
  ) { }

  ngOnInit() {
    this.initGrid();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.checkForDocuments();
  }

  checkForDocuments() {
    this.documents.subscribe(doc => {
      this.documentsList = doc;
    })
  }

  private initGrid() {
    this.settings = {
      columns: [
        this.gridFactory.actions({
          id: 'menu',
          header: 'ACCIONES',
          getActionsCallback: () => this.setGridActions()
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

  newDocument() {
    this.isNewDocumentOpen = !this.isNewDocumentOpen;
  }

  linkDocument(){
    this.router.navigate([`link-document/${this.personID}/${this.caseID}`]);
  }

  newVersion(row) {
    this.document = row;
    this.isNewDocumentOpen = true;
  }

  setGridActions(): Array<any> {
    const action = [
      {
        label: 'Descargar',
        icon: 'download',
        action: (row: any) => {
          this.dowload(row);
        }
      }
    ];
    if (this.show) {
      action.push({
        label: 'Nueva versión',
        icon: 'edit',
        action: (row: any) => {
          this.newVersion(row)
        }
      });
      action.push(
        {
          label: 'Eliminar',
          icon: 'trash',
          action: (row: any) => {
            this.delete(row);
          }
        }
      )
    }
    return action;
  }

  link() {
    this.onLink.emit();
  }

  delete(row) {
    this.documentService.delete(row.documentId).subscribe(cases => {
      this.toastr.success('Se borró el documento con éxito', 'Éxito');
      this.onDelete.emit(row.documentId)
      this.documents.subscribe(doc => {
        this.documents = of(doc.filter(x => x.documentId != row.documentId));
        this.documentsList = doc.filter(x => x.documentId != row.documentId);
      });
    });
  }

  addDocumentEmit(doc: DocumentAttached) {
    this.documents.subscribe(res => {
      res.push(doc);
      this.documents = of(res);
      this.documentsList = res;
      this.onNewDocument.emit(res);
      this.isNewDocumentOpen = false;
    })
  }

  newVersionDocumentEmit(doc: DocumentAttached) {
    this.documents.subscribe(res => {
      for (let index = 0; index < res.length; index++) {
        if (res[index].documentId == doc.documentId) {
          res[index] = doc;
        }
      };
      this.documents = of(res);
      this.documentsList = res;
      this.isNewDocumentOpen = false;
    });
  }

  cancelDocument(event) {
    this.isNewDocumentOpen = false;
    this.document = null;
  }

  dowload(row) {
    this.documentService.getbase64(row.physicalName).subscribe(res => {
      const blob = this.dataURItoBlob(res.base64);
      const url = window.URL.createObjectURL(blob);
      let a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute("style", "display:none");
      a.href = url;
      a.download = row.physicalName;
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    })
  }

  private navigateToList() {
    this.router.navigate(['../analyst-assignment']);
  }

  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpg' });
    return blob;
  }
}