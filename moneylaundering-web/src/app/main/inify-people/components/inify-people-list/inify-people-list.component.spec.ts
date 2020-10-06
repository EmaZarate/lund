import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InifyPeopleListComponent } from './inify-people-list.component';

describe('InifyPeopleListComponent', () => {
  let component: InifyPeopleListComponent;
  let fixture: ComponentFixture<InifyPeopleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InifyPeopleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InifyPeopleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
