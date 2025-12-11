import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LabelOnMapComponent } from './label-on-map.component';

describe('LabelOnMapComponent', () => {
  let component: LabelOnMapComponent;
  let fixture: ComponentFixture<LabelOnMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabelOnMapComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LabelOnMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
