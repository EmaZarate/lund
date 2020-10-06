import { ElementRef, Component, OnInit, Input, ViewChild, ViewChildren, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormControlName, ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UploadService } from './service/upload.service';
import { DateFormat } from 'src/app/shared/dateFormat';
import { SelectDocumentstypeService } from '../../services/documentstype.service';
import { DocumentEvidence } from './models/documentEvidence';
import { Document } from './models/new-document.models';
import { Subject, Observable } from 'rxjs';
import { DocumentAttached } from '../../models/document-attached.model';
import { isNull, isUndefined } from 'util';
import { MyFile } from '../upload-file/upload-file.component';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'app-upload-new-document',
  templateUrl: './upload-new-document.component.html',
  styleUrls: ['./upload-new-document.component.scss']
})

export class UploadNewDocumentComponent implements OnInit {


  constructor(private fb: FormBuilder,
    private documentService: SelectDocumentstypeService,
    private uploadService: UploadService,
    private toast: ToastrService,
    private loadingService: LoadingService) { }

  @Input() isNewVersion = false;
  @Input() caseID = null;
  @Input() personID;
  @Input() document: DocumentAttached;
  @Output() newDocumentEmit: EventEmitter<DocumentAttached> = new EventEmitter();
  @Output() newVersionDocumentEmit: EventEmitter<DocumentAttached> = new EventEmitter();
  @Output() cancelEmit: EventEmitter<any> = new EventEmitter();

  @ViewChild('file', { static: false }) file;
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  newdocument: FormGroup;
  subscripcion: any;
  types$: Observable<any> = new Observable<any>();
  _documents: DocumentEvidence[] = [];
  _document = new Document();
  isCheckboxDisabled:boolean = false;
  _newAttachments: Array<MyFile> = [];
  _attachments: Array<MyFile> = [];

  get nombre() { return this.newdocument.get('nombre'); }
  get tipo() { return this.newdocument.get('tipo'); }
  get expiration() { return this.newdocument.get('expiration'); }
  get observaciones() { return this.newdocument.get('observaciones'); }
  get confidencial() { return this.newdocument.get('confidencial'); }
  get versionActual() { return this.newdocument.get('versionActual') }

  cargartipos() {
    this.types$ = this.documentService.getDocumentsType();
  }

  ngOnInit() {
    this.createForm();
    this.cargartipos();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.document) {
      return;
    }
    this.patchDocument(changes.document.currentValue);
  }

  patchDocument(document: DocumentAttached){
    if(!isNull(this.document)){
      this.versionActual.patchValue(this.document.versionId);
      this.nombre.patchValue(this.document.logicName);
      this.expiration.patchValue(this.document.expiration.toString() !== "0001-01-01T00:00:00" ? this.document.expiration : null);
      this.confidencial.patchValue(this.document.confidential);
      let documentType;
      this.types$.subscribe(res =>{
        documentType = res.find(x => x.id == this.document.documentTypeId);
        this.tipo.patchValue(documentType);
      });
      this.observaciones.patchValue(this.document.comment);
      this.nombre.disable();
      this.isCheckboxDisabled = true;
    }
  }

  createForm() {
    this.newdocument = this.fb.group({
      versionActual: [''],
      nombre: ['', [Validators.minLength(4), Validators.required]],
      tipo: ['', Validators.required],
      expiration: [null],
      observaciones: [''],
      confidencial: [false],
    })
  }

  onSubmit() {
    if (this.newdocument.valid && this._documents.length > 0) {
      this.loadingService.setLoading(true);
      this._document.documentEvidence = this._documents[0];
      this._document.logicName = this.nombre.value;
      this._document.documentTypeId = this.tipo.value.id;
      this._document.comment = this.observaciones.value;
      this._document.confidential = this.confidencial.value;
      this._document.expiration = this.expiration.value !== null ? new Date(this.expiration.value).toUTCString() : "";
      if(!isUndefined(this.caseID)) this._document.caseId = this.caseID; 
      this._document.businessUnit = 1;
      this._document.personId = this.personID;
      if(this.document){
        this._document.versionId = this.document.versionId + 1;
        this._document.documentId = this.document.documentId
        this.uploadService.newVersionDocument(this._document)
        .subscribe((res) => {
          this.loadingService.setLoading(false);
          this.resetForm();
          this.toast.success('Nueva Versión Agregada');
          this.newVersionDocumentEmit.emit(res);
        });
      }
      else{
        this._document.versionId = 1;
        this.uploadService.uploadDocument(this._document)
        .subscribe((res) => {
          this.loadingService.setLoading(false);
          this.resetForm();
          this.toast.success('Documento cargado');
          this.newDocumentEmit.emit(res);
        });
      }
    } else {
      this.toast.error('Ingrese todos los campos obligatorios');
    }

  }

  resetForm() {
    this._documents = [];
    this.nombre.patchValue("");
    this.tipo.patchValue(null);
    this.observaciones.patchValue("");
    this.confidencial.patchValue(false);
    this.expiration.patchValue(null);
    this.nombre.enable();
    this.confidencial.enable();
    this.versionActual.patchValue("");
    this.document = null;
    this.isCheckboxDisabled = false;
    this._attachments = [];
    this._newAttachments = [];
  }

  getAttachments(event): void {
    this._documents = event;
    if(!this.document){
      let nameDocumentWithoutExtention: string = "";
      if (this._documents.length != 0) {
        const nameDocument: string[] = this._documents[0].name.split('.');
        nameDocument.splice(-1, 1);
        nameDocument.forEach(x => nameDocumentWithoutExtention = nameDocumentWithoutExtention.concat(x))
      }
      this.nombre.patchValue(nameDocumentWithoutExtention);
    }
    
  }

  initDate() {
    const today = new Date();
    const formatedDate = new DateFormat().format(today);
    return formatedDate;
  }

  cancel() {
    this.resetForm();
    this.document = null;
    this.cancelEmit.emit();
  }
}
