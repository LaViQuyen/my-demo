import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelOnMapTestingComponent } from './label-on-map-testing.component';

describe('LabelOnMapTestingComponent', () => {
  let component: LabelOnMapTestingComponent;
  let fixture: ComponentFixture<LabelOnMapTestingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabelOnMapTestingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabelOnMapTestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
