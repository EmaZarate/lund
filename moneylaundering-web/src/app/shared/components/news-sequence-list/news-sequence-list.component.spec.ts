import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsSequenceListComponent } from './news-sequence-list.component';

describe('NewsSequenceListComponent', () => {
  let component: NewsSequenceListComponent;
  let fixture: ComponentFixture<NewsSequenceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsSequenceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsSequenceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
