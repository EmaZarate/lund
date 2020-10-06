import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducerManagementDetailComponent } from './producer-management-detail.component';

describe('ProducerManagementDetailComponent', () => {
  let component: ProducerManagementDetailComponent;
  let fixture: ComponentFixture<ProducerManagementDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProducerManagementDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProducerManagementDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
