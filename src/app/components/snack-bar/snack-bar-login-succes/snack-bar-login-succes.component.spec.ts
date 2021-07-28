import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackBarLoginSuccesComponent } from './snack-bar-login-succes.component';

describe('SnackBarLoginSuccesComponent', () => {
  let component: SnackBarLoginSuccesComponent;
  let fixture: ComponentFixture<SnackBarLoginSuccesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnackBarLoginSuccesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackBarLoginSuccesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
