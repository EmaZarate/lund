import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadNewDocumentComponent } from './upload-new-document.component';

describe('UploadNewDocumentComponent', () => {
  let component: UploadNewDocumentComponent;
  let fixture: ComponentFixture<UploadNewDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadNewDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadNewDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
