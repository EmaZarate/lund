import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseEndingComponent } from './case-ending.component';

describe('CaseEndingComponent', () => {
  let component: CaseEndingComponent;
  let fixture: ComponentFixture<CaseEndingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseEndingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseEndingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
