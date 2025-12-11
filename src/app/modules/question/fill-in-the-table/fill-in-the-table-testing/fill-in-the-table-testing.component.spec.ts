import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillInTheTableTestingComponent } from './fill-in-the-table-testing.component';

describe('FillInTheTableTestingComponent', () => {
  let component: FillInTheTableTestingComponent;
  let fixture: ComponentFixture<FillInTheTableTestingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FillInTheTableTestingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FillInTheTableTestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
