import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FullLayoutComponent } from './full-layout.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ScrollService, ScrollServiceStub } from '@sc/portal.fe.lib.ui-core-components';

describe('FullLayoutComponent', () => {
  let component: FullLayoutComponent;
  let fixture: ComponentFixture<FullLayoutComponent>;
  let scrollService: ScrollServiceStub;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ FullLayoutComponent ],
      imports: [ RouterTestingModule ],
      providers: [
        { provide: ScrollService, useClass: ScrollServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullLayoutComponent);
    component = fixture.componentInstance;

    scrollService = TestBed.get(ScrollService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable the scroll when the menu is opened', () => {
    const disableScrollSpy = spyOn(scrollService, 'disableViewportScroll');
    const navbarElement = fixture.debugElement.query(By.css('sc-navbar'));
    navbarElement.triggerEventHandler('isMobileMenuOpen', true);
    expect(disableScrollSpy).toHaveBeenCalled();
  });

  it('should enable the scroll when the menu is closed', () => {
    const enableScrollSpy = spyOn(scrollService, 'enableViewportScroll');
    const navbarElement = fixture.debugElement.query(By.css('sc-navbar'));
    navbarElement.triggerEventHandler('isMobileMenuOpen', false);
    expect(enableScrollSpy).toHaveBeenCalled();
  });
});
