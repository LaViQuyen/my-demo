import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddOrEditFolderDialog } from './add-or-edit-folder-dialog.component';

describe('AddOrEditFolderComponent', () => {
  let component: AddOrEditFolderDialog;
  let fixture: ComponentFixture<AddOrEditFolderDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddOrEditFolderDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(AddOrEditFolderDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
