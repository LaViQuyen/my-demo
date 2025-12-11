import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillInTheTableReadonlyComponent } from './fill-in-the-table-readonly.component';

describe('FillInTheTableReadonlyComponent', () => {
  let component: FillInTheTableReadonlyComponent;
  let fixture: ComponentFixture<FillInTheTableReadonlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FillInTheTableReadonlyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FillInTheTableReadonlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
