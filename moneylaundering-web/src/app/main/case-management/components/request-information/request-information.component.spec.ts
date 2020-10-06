import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestInformationComponent } from './request-information.component';

describe('RequestInformationComponent', () => {
  let component: RequestInformationComponent;
  let fixture: ComponentFixture<RequestInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
