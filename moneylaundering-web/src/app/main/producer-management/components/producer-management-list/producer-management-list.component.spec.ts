import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducerManagementListComponent } from './producer-management-list.component';

describe('ProducerManagementListComponent', () => {
  let component: ProducerManagementListComponent;
  let fixture: ComponentFixture<ProducerManagementListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProducerManagementListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProducerManagementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
