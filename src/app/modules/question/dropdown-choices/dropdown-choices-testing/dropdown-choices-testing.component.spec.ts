import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownChoicesTestingComponent } from './dropdown-choices-testing.component';

describe('DropdownChoicesTestingComponent', () => {
  let component: DropdownChoicesTestingComponent;
  let fixture: ComponentFixture<DropdownChoicesTestingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownChoicesTestingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownChoicesTestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
