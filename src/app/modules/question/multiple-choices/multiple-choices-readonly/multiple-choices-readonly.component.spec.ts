import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MultipleChoicesReadonlyComponent } from './multiple-choices-readonly.component';

describe('MultipleChoicesReadonlyComponent', () => {
  let component: MultipleChoicesReadonlyComponent;
  let fixture: ComponentFixture<MultipleChoicesReadonlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultipleChoicesReadonlyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MultipleChoicesReadonlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
