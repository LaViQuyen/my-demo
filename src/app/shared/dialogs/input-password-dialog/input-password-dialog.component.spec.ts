import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputPasswordDialogComponent } from './input-password-dialog.component';

describe('InputPasswordDialogComponent', () => {
  let component: InputPasswordDialogComponent;
  let fixture: ComponentFixture<InputPasswordDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputPasswordDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputPasswordDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
