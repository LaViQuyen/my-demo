import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownChoicesComponent } from './dropdown-choices.component';

describe('DropdownChoicesComponent', () => {
  let component: DropdownChoicesComponent;
  let fixture: ComponentFixture<DropdownChoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownChoicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DropdownChoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
