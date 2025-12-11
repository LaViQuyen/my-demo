import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchingHeaderEditingComponent } from './matching-header-editing.component';

describe('MatchingHeaderEditingComponent', () => {
  let component: MatchingHeaderEditingComponent;
  let fixture: ComponentFixture<MatchingHeaderEditingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchingHeaderEditingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchingHeaderEditingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
