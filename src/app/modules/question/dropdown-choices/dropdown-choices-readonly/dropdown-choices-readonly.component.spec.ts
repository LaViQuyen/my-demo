import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownChoicesReadonlyComponent } from './dropdown-choices-readonly.component';

describe('DropdownChoicesReadonlyComponent', () => {
  let component: DropdownChoicesReadonlyComponent;
  let fixture: ComponentFixture<DropdownChoicesReadonlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownChoicesReadonlyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownChoicesReadonlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
