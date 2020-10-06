import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkComponentComponent } from './link-component.component';

describe('LinkComponentComponent', () => {
  let component: LinkComponentComponent;
  let fixture: ComponentFixture<LinkComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
