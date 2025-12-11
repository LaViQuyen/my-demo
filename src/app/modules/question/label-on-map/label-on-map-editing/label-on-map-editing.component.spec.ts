import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelOnMapEditingComponent } from './label-on-map-editing.component';

describe('LabelOnMapEditingComponent', () => {
  let component: LabelOnMapEditingComponent;
  let fixture: ComponentFixture<LabelOnMapEditingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabelOnMapEditingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabelOnMapEditingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
