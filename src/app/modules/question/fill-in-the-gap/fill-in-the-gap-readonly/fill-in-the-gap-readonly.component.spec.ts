import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillInTheGapReadonlyComponent } from './fill-in-the-gap-readonly.component';

describe('FillInTheGapReadonlyComponent', () => {
  let component: FillInTheGapReadonlyComponent;
  let fixture: ComponentFixture<FillInTheGapReadonlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FillInTheGapReadonlyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FillInTheGapReadonlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
