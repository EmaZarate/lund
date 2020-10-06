import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentAttachedListComponent } from './document-attached-list.component';

describe('DocumentAttachedListComponent', () => {
  let component: DocumentAttachedListComponent;
  let fixture: ComponentFixture<DocumentAttachedListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentAttachedListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentAttachedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
