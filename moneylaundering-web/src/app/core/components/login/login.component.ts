import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MicrosoftGraphService } from '../../services/microsoft-graph.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LoadingService } from '../../services/loading.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private msft: MicrosoftGraphService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private loadingService: LoadingService) { }

  loginForm: FormGroup;
  businessUnitItems;

  get businessUnit() {return this.loginForm.get('businessUnit')};
  
  ngOnInit() {

    this.businessUnitItems = this.mapArrayItems(this.activatedRoute.snapshot.data['businessUnits'], "id", "description");

    this.loginForm = this.createForm();
    
    let token = localStorage.getItem('auth_token');
    let businesUnitStorage = localStorage.getItem('businessUnitId');
    
    if (token && businesUnitStorage) {
      this.router.navigate(['/home-page']);
    }

    else if(businesUnitStorage){
      this.businessUnit.patchValue(this.businessUnitItems.find( x => x.id == businesUnitStorage))
      this.msft.login();
    }
  }

  createForm(){
    return this.fb.group({
      businessUnit: ['', Validators.required]
    });
  }

  mapArrayItems(array: any, id, value){
    return array.map(x => {return {id:x[id], value:x[value]}})
 }

  ingresar(){
    localStorage.setItem('businessUnitId', this.businessUnit.value.id)
    this.msft.login();
    this.loadingService.setLoading(true);
  }

}
