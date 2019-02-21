import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HidenavStretchheaderComponent } from './hidenav-stretchheader.component';

describe('HidenavStretchheaderComponent', () => {
  let component: HidenavStretchheaderComponent;
  let fixture: ComponentFixture<HidenavStretchheaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HidenavStretchheaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HidenavStretchheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
