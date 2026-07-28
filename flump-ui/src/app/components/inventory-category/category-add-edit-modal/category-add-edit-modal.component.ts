import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MsgService } from '../../../services/msg.service';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-add-edit-modal',
  standalone: false,
  templateUrl: './category-add-edit-modal.component.html',
  styleUrl: './category-add-edit-modal.component.scss'
})
export class CategoryAddEditModalComponent implements OnInit {
  public categoryForm!: FormGroup;
  isSubmitted: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<CategoryAddEditModalComponent>,
    private formBuilder: FormBuilder,
    private msgService: MsgService,
    private categoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA) public dialogData: any
  ) { }

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      id: [null, []],
      categoryName: ['', [Validators.required]],
    });

    if (this.dialogData.action === 'edit' && this.dialogData.editData) {
      this.categoryForm.patchValue(this.dialogData?.editData);
    }
  }

  onCategoryFormSubmit() {
    if (this.categoryForm.valid && !this.isSubmitted) {
      this.isSubmitted = true;
      if (this.dialogData.action === 'add') {
        this.categoryService.createCategory(this.categoryForm.value).subscribe({
          next: (res) => {
            this.msgService.typeSuccess("Category Added Successfully", "Success");
            this.isSubmitted = false;
            this.closeDialog(true);
          },
          error: (err) => {
            this.msgService.typeError(err.error.message, "Error");
            this.isSubmitted = false;
          }
        });
      }
      else {
        this.categoryService.updateCategory(this.categoryForm.value, this.categoryForm.get('id')?.value).subscribe({
          next: (res) => {
            this.msgService.typeSuccess("Category Updated Successfully", "Success");
            this.isSubmitted = false;
            this.closeDialog(true);
          },
          error: (err) => {
            this.msgService.typeError(err.error.message, "Error");
            this.isSubmitted = false;
          }
        });
      }
    }
  }

  closeDialog(refresh: boolean = false) {
    this.dialogRef.close({ refresh });
  }
}

