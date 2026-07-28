import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MsgService } from '../../../services/msg.service';
import { InventoryService } from '../inventory.service';
import { CategoryService } from '../../inventory-category/category.service';

@Component({
  selector: 'app-inventory-add-edit-dialog',
  standalone: false,
  templateUrl: './inventory-add-edit-dialog.component.html',
  styleUrl: './inventory-add-edit-dialog.component.scss'
})
export class InventoryAddEditDialogComponent implements OnInit {
  public inventoryForm!: FormGroup;
  isSubmitted: boolean = false;
  categories: Array<any> = [];

  constructor(
    private dialogRef: MatDialogRef<InventoryAddEditDialogComponent>,
    private formBuilder: FormBuilder,
    private msgService: MsgService,
    private inventoryService: InventoryService,
    private categoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA) public dialogData: any
  ) { }

  ngOnInit(): void {
    this.inventoryForm = this.formBuilder.group({
      id: [null, []],
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      totalQuantity: ['', [Validators.required]],
      inventoryType: ['', [Validators.required]],
    });
    this.fetchAllCategoryAndPatchValue();
  }

  onInventoryFormSubmit() {
    if (this.inventoryForm.valid && !this.isSubmitted) {
      this.isSubmitted = true;
      if (this.dialogData.action === 'add') {
        this.inventoryService.createInventory(this.inventoryForm.value).subscribe({
          next: (res) => {
            this.msgService.typeSuccess("Inventory Added Successfully", "Success");
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
        this.inventoryService.updateInventory(this.inventoryForm.value, this.inventoryForm.get('id')?.value).subscribe({
          next: (res) => {
            this.msgService.typeSuccess("Inventory Updated Successfully", "Success");
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

  fetchAllCategoryAndPatchValue() {
    this.categoryService.getAllCategory().subscribe({
      next: (res: any) => {
        this.categories = res;
        if (this.dialogData.action === 'edit' && this.dialogData.editData) {
          this.inventoryForm.patchValue(this.dialogData?.editData);
        }
      },
      error: (err) => {
        this.msgService.typeError(err.error.message, "Error");
      }
    });
  }

  closeDialog(refresh: boolean = false) {
    this.dialogRef.close({ refresh });
  }
}
