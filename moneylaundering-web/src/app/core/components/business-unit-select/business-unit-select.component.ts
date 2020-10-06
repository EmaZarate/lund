import { Component, OnInit } from '@angular/core';
import { SelectBusinessuinitService } from 'src/app/shared/services/select-businessuinit.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-business-unit-select',
  templateUrl: './business-unit-select.component.html',
  styleUrls: ['./business-unit-select.component.scss']
})
export class BusinessUnitSelectComponent implements OnInit {

  businessUnitForm: FormGroup;
  businessUnitItems: any[] = [];

  get businessUnitControl() { return this.businessUnitForm.get('businessUnitControl'); } 

  constructor(
    private fb: FormBuilder,
    private businessUnitService: SelectBusinessuinitService,
    private router: Router
    ) { }

  ngOnInit() {

    this.initForm(); 

    this.businessUnitService.getBusinessUnit().subscribe( resp => {
      for (var i=0;i<resp.length;i++)
        this.businessUnitItems.push ({key: resp[i]['id'], value: resp[i]['description']});
    });

    this.businessUnitForm.get("businessUnitControl").valueChanges
      .subscribe(value => {
        this.selectChanged(value.key);
    }); 

  }

  initForm() {
    this.businessUnitForm = this.fb.group({
      businessUnitControl: [null, [Validators.required]]
    });
  }
  
  selectChanged(key) {

    localStorage.setItem('businessUnitId', key);
    this.router.navigate(['home-page']);
    
  }
}
