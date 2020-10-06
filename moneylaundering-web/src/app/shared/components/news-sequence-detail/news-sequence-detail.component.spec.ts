import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsSequenceDetailComponent } from './news-sequence-detail.component';

describe('NewsSequenceDetailComponent', () => {
  let component: NewsSequenceDetailComponent;
  let fixture: ComponentFixture<NewsSequenceDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsSequenceDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsSequenceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
