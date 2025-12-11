import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelOnMapReadonlyComponent } from './label-on-map-readonly.component';

describe('LabelOnMapReadonlyComponent', () => {
  let component: LabelOnMapReadonlyComponent;
  let fixture: ComponentFixture<LabelOnMapReadonlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabelOnMapReadonlyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabelOnMapReadonlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
