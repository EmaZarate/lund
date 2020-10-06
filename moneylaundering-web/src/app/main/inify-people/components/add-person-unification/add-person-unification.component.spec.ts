import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPersonUnificationComponent } from './add-person-unification.component';

describe('AddPersonUnificationComponent', () => {
  let component: AddPersonUnificationComponent;
  let fixture: ComponentFixture<AddPersonUnificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPersonUnificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPersonUnificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
