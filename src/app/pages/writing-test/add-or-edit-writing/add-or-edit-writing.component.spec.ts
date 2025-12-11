import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddOrEditWritingComponent } from './add-or-edit-writing.component';

describe('AddOrEditWritingComponent', () => {
  let component: AddOrEditWritingComponent;
  let fixture: ComponentFixture<AddOrEditWritingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddOrEditWritingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddOrEditWritingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
