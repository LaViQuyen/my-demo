import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditFolderComponent } from './add-or-edit-folder.component';

describe('AddOrEditFolderComponent', () => {
  let component: AddOrEditFolderComponent;
  let fixture: ComponentFixture<AddOrEditFolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddOrEditFolderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOrEditFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
