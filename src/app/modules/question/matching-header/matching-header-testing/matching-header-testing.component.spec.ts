import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchingHeaderTestingComponent } from './matching-header-testing.component';

describe('MatchingHeaderTestingComponent', () => {
  let component: MatchingHeaderTestingComponent;
  let fixture: ComponentFixture<MatchingHeaderTestingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchingHeaderTestingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchingHeaderTestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
