import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryAddEditModalComponent } from '../../inventory-category/category-add-edit-modal/category-add-edit-modal.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MsgService } from '../../../services/msg.service';;
import { OffersService } from '../offers.service';

@Component({
  selector: 'app-offer-add-edit',
  standalone: false,
  templateUrl: './offer-add-edit.component.html',
  styleUrl: './offer-add-edit.component.scss'
})
export class OfferAddEditComponent implements OnInit {
  public offerForm!: FormGroup;
  isSubmitted: boolean = false;
  
  constructor(
    private dialogRef: MatDialogRef<CategoryAddEditModalComponent>,
    private formBuilder: FormBuilder,
    private msgService: MsgService,
    private offerService: OffersService,
    @Inject(MAT_DIALOG_DATA) public dialogData: any
  ) { }

  ngOnInit(): void {
    this.offerForm = this.formBuilder.group({
      id: [null, []],
      isActive: ['', [Validators.required]],
      end: ['', [Validators.required]],
      start: ['', [Validators.required]],
      percentage: ['', [ Validators.required, Validators.pattern('^[0-9]+$'), Validators.min(1),Validators.max(100)]],
      offerName: ['', [Validators.required]],
    });

    if (this.dialogData.action === 'edit' && this.dialogData.editData) {
      this.offerForm.patchValue(this.dialogData?.editData);
    }
  }

  OnOfferSubmit() {
    if (this.offerForm.valid && !this.isSubmitted) {
      this.isSubmitted = true;
      const payload = {
        offerName: this.offerForm.value.offerName,
        percentage: Number(this.offerForm.value.percentage),
        start: new Date(this.offerForm.value.start),
        end: new Date(this.offerForm.value.end),
        isActive: this.offerForm.value.isActive
      };
      if (this.dialogData.action === 'add') {
        this.offerService.createOffer(payload).subscribe({
          next: (res) => {
            this.msgService.typeSuccess("Offer Added Successfully", "Success");
            this.isSubmitted = false;
            this.closeDialog(true);
          },
          error: (err) => {
            this.msgService.typeError(err.error.message, "Error");
            this.isSubmitted = false;
          }
        });
      } else {
        this.offerService.updateOfferDetails(this.offerForm.get('id')?.value, payload).subscribe({
          next: (res) => {
            this.msgService.typeSuccess("Offer Updated Successfully", "Success");
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
