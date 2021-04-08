import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleBodyFormComponent } from './title-body-form.component';

describe('TitleBodyFormComponent', () => {
  let component: TitleBodyFormComponent;
  let fixture: ComponentFixture<TitleBodyFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TitleBodyFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleBodyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
