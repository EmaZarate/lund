import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericDataCaseComponent } from './generic-data-case.component';

describe('GenericDataCaseComponent', () => {
  let component: GenericDataCaseComponent;
  let fixture: ComponentFixture<GenericDataCaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericDataCaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericDataCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
