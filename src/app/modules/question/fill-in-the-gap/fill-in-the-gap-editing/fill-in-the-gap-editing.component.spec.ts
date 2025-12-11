import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillInTheGapEditingComponent } from './fill-in-the-gap-editing.component';

describe('FillInTheGapEditingComponent', () => {
  let component: FillInTheGapEditingComponent;
  let fixture: ComponentFixture<FillInTheGapEditingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FillInTheGapEditingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FillInTheGapEditingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
