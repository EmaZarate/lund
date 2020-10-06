import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { MicrosoftGraphService } from '../../services/microsoft-graph.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  class FakeRouter {
    navigate(params){
    }
  }

  class MicrosoftGraphServiceMock{
    login(){
      
    }
  }


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers:[
        {provide: Router, useClass: FakeRouter},
        {provide: MicrosoftGraphService, useClass: MicrosoftGraphServiceMock}
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    localStorage.removeItem('auth_token');
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(()=>{
    localStorage.removeItem('auth_token');
  });

  it('should be call msft.login with auth-token is null', () => {
    const msft = TestBed.get(MicrosoftGraphService);
    const spy = spyOn(msft, 'login');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should be redirect to login when  auth-token is not null', () => {
    localStorage.setItem('auth_token', 'asdasd');
    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');
    component.ngOnInit();
    expect(spy).toHaveBeenCalledWith(['home-page']);
  });

  it('should be redirect to login', ()=>{
    const msft = TestBed.get(MicrosoftGraphService);
    const spy = spyOn(msft, 'login');
    component.ingresar();
    expect(spy).toHaveBeenCalled()
  });

});
