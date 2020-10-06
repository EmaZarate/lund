import { DateFormat } from 'src/app/shared/dateFormat';
import { SelectNewsReasonTypeService } from './../../services/select-news-reason-type.service';
import { NewsReason } from '../../models/newsReason.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { News } from 'src/app/main/case-management/models/news';
import { GridSettings, GridColumnFactoryService } from '@sc/portal.fe.lib.ui-core-components';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news-sequence-list',
  templateUrl: './news-sequence-list.component.html',
  styleUrls: ['./news-sequence-list.component.scss']
})
export class NewsSequenceListComponent implements OnInit {

  @Output() onOpen: EventEmitter<any> = new EventEmitter();
  @Output() observation: EventEmitter<String> = new EventEmitter();
  @Output() isValidNewsForm: EventEmitter<any> = new EventEmitter(); 
  @Input() news: Observable<News[]>;
  @Input() newsReason: number;
  @Input() hasNewsReasons: boolean;
  @Input() hasComments: boolean = true; 
  reasonsAsync$: Observable<NewsReason[]>
  settings: GridSettings;

  form: FormGroup;

  get reasons() { return this.form.get('reasons') }
  get observations() { return this.form.get('observations') }
  
  constructor(
    private gridFactory: GridColumnFactoryService,
    private newsReasonTypeService: SelectNewsReasonTypeService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.initGrid();
    this.initForm();
    if (this.hasNewsReasons) {
      this.getNewsReasonTypes(this.newsReason);
    }
  }
  
  private initForm() {
    this.form = this.fb.group({
      reasons: ['', Validators.required],
      observations: ['']
    });
    this.onFormInit(this.form);
    this.onFormChanges();
    this.onChangeObservation();
  } 



  onChangeObservation(){
    this.observations.valueChanges.subscribe(() => {
      this.observation.emit(this.observations.value);
    })
  }

  onOptionChanged(event: NewsReason) {
    if (event.newsReasonTypeId == 1) {
      this.observations.setValidators([Validators.required]);
      this.observations.updateValueAndValidity();
    }
    else {
      this.observations.clearValidators();
      this.observations.updateValueAndValidity();
    };
  }

  private getNewsReasonTypes(id: number) {
    this.newsReasonTypeService.getNewsReasonTypes(id)
                              .subscribe(reasons => {
                                this.reasonsAsync$ = of(reasons);
                              });
  }

  onFormInit(form: FormGroup) {
    this.isValidNewsForm.emit(form);
  }

  onFormChanges() {
    this.form.valueChanges.subscribe(() => {
      this.isValidNewsForm.emit(this.form);
    })
  }

  private initGrid() {
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
                this.router.navigate(['/news/'+row.id+"/detail"]);
              }
            }
          ],
        }),
        this.gridFactory.value({
          id: 'id',
          header: '#',
          primaryValueGetter: (row: any) => { // You can use either a property or a callback
            return row.id;
          }
        }),
        this.gridFactory.value({
          id: 'newsType',
          header: 'Tipo',
          primaryValueGetter: (row: any) => { // You can use either a property or a callback
            return row.newsTypeDescription;
          }
        }),
        this.gridFactory.value({
          id: 'newsState',
          header: 'Estado',
          primaryValueGetter: (row: any) => { // You can use either a property or a callback
            return row.statusDescription;
          }
        }),
        this.gridFactory.value({
          id: 'newsCreateDate',
          header: 'Inicio',
          primaryValueGetter: (row: News) => { // You can use either a property or a callback
            const date = new DateFormat()
            return date.format(row.createDate);
          }
        })
      ]
    };
  }
}

