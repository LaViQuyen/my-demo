import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchingHeaderReadonlyComponent } from './matching-header-readonly.component';

describe('MatchingHeaderReadonlyComponent', () => {
  let component: MatchingHeaderReadonlyComponent;
  let fixture: ComponentFixture<MatchingHeaderReadonlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchingHeaderReadonlyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchingHeaderReadonlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
