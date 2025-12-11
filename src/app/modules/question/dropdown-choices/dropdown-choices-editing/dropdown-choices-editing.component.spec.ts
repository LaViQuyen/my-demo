import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownChoicesEditingComponent } from './dropdown-choices-editing.component';

describe('DropdownChoicesEditingComponent', () => {
  let component: DropdownChoicesEditingComponent;
  let fixture: ComponentFixture<DropdownChoicesEditingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownChoicesEditingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownChoicesEditingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
