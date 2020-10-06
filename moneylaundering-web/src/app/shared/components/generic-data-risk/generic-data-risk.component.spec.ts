import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericDataRiskComponent } from './generic-data-risk.component';

describe('GenericDataRiskComponent', () => {
  let component: GenericDataRiskComponent;
  let fixture: ComponentFixture<GenericDataRiskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericDataRiskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericDataRiskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
