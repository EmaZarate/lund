import { Component, OnInit, EventEmitter, Output  } from '@angular/core';
import { SelectBusinessuinitService } from 'src/app/shared/services/select-businessuinit.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { KeyValue, Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-select-businessunit',
  templateUrl: './select-businessunit.component.html',
  styleUrls: ['./select-businessunit.component.scss']
})

export class SelectBusinessunitComponent implements OnInit {

  @Output() isValidForm: EventEmitter<any> = new EventEmitter();
  
  businessUnitForm: FormGroup;  
  businessUnitElement: KeyValue<string, string>;
  businessUnitItems: any[] = [];
  businessUnitReadonly: boolean = false;
  routePresent: string;

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private businessUnitService: SelectBusinessuinitService
  ) 
  { 
    router.events.subscribe(val => {
      if (location.path().toString().length>0)
        this.businessUnitReadonly = (location.path().toString().match(new RegExp("/", "g")) || []).length>2;
    });
  }

  ngOnInit() {  
    
    var url = this.router.routerState.snapshot.url.toString();
    
    this.businessUnitForm = this.fb.group({ businessUnitSelect: [''] });
    this.businessUnitService.getBusinessUnit().subscribe( resp => {

      for (var i=0;i<resp.length;i++)
        this.businessUnitItems.push ({key: resp[i]['id'], value: resp[i]['description']});

        this.selectKey();
        this.onFormInit(this.businessUnitForm);
        this.onFormChanges();

    });
  }

  onFormInit(form: FormGroup) {
    this.isValidForm.emit(form);
  }

  onFormChanges() {
    this.businessUnitForm.controls['businessUnitSelect'].valueChanges.subscribe(value => {
        this.selectChanged(value);
    }); 
  }
  
  selectKey() {

    var buid : number = parseInt(this.activatedRoute.snapshot.params.id);
    buid = isNaN(buid) ? parseInt(localStorage.getItem('businessUnitId')) : buid;
    buid = isNaN(buid) ? 1 : buid;

    var ix =0;
    for (var i=0;i<this.businessUnitItems.length;i++)
      if (buid==this.businessUnitItems[i].key)
        ix  = i;

    this.businessUnitForm.get("businessUnitSelect").patchValue(this.businessUnitItems[ix]);
  }

  selectChanged(value) {
    
    localStorage.setItem('businessUnitId', value.key);
    var url = this.router.routerState.snapshot.url.toString().split('/')[1].toString().split(';')[0];

    this.router.navigateByUrl('/'+url, { skipLocationChange: true }).then(() => {
      this.router.navigate([url, value.key]);
  });

  }
}