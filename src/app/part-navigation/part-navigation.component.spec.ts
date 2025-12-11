import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartNavigationComponent } from './part-navigation.component';

describe('PartNavigationComponent', () => {
  let component: PartNavigationComponent;
  let fixture: ComponentFixture<PartNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartNavigationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PartNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
