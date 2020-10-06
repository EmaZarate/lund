import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorLoginComponent } from './error-login.component';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ErrorLoginComponent', () => {
  let component: ErrorLoginComponent;
  let fixture: ComponentFixture<ErrorLoginComponent>;

  class FakeRouter {
    navigate(params){
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorLoginComponent ],
      providers:[
        {provide: Router, useClass: FakeRouter}
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it('should redirect login', () =>{
     const router = TestBed.get(Router);
     
     const spy = spyOn(router, 'navigate');

     component.redirectLogin();

     expect(spy).toHaveBeenCalledWith(['login']);
  })
});
