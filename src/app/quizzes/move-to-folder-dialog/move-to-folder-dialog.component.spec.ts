import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveToFolderDialogComponent } from './move-to-folder-dialog.component';

describe('MoveToFolderDialogComponent', () => {
  let component: MoveToFolderDialogComponent;
  let fixture: ComponentFixture<MoveToFolderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoveToFolderDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoveToFolderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
