import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonEditFormComponent } from './person-edit-form.component';

describe('PersonEditFormComponent', () => {
  let component: PersonEditFormComponent;
  let fixture: ComponentFixture<PersonEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
