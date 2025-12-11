import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WritingTestComponent } from './writing-test.component';

describe('WritingTestComponent', () => {
  let component: WritingTestComponent;
  let fixture: ComponentFixture<WritingTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WritingTestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WritingTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
