import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import moment from 'moment';

@Component({
  selector: 'app-children-form-dialog',
  standalone: false,
  templateUrl: './children-form-dialog.component.html',
  styleUrl: './children-form-dialog.component.scss',
})
export class ChildrenFormDialogComponent implements OnInit {
  childrenRegistrationForm!: FormGroup;
  maxDate: Date = new Date();

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ChildrenFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.initialForm();
  }
  ngOnInit(): void {
    if (this.data.action === 'edit') {
      this.childrenRegistrationForm.patchValue(this.data.editData);
    }
  }

  initialForm() {
    this.childrenRegistrationForm = this.formBuilder.group({
      id: [''],
      fullName: ['',Validators.required],
      dateOfBirth: [''],
      fatherName: ['',],
      mothersName: ['',],
      parentContactNo: ['',[Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      address: ['',Validators.required],
      dateOfJoining: ['',Validators.required],
    });
  }

  submitForm() {
    if (this.childrenRegistrationForm.valid) {
      if (this.data.action === 'edit') {
        this.dialogRef.close(this.childrenRegistrationForm.value);
      } else {
        const formData = this.childrenRegistrationForm.value;
        formData.dateOfJoining = this.formatDateWithTime(formData.dateOfJoining);
        delete formData['id'];
        this.dialogRef.close(formData);
      }
    }
  }

  formatDateWithTime(date: any): string | null {
    if (!date) return null;
    return moment(date)
      .set({
        hour: moment().hour(),minute: moment().minute(),second: moment().second()
      }).format("YYYY-MM-DDTHH:mm:ss");
  }
  
  closeDialog() {
    this.dialogRef.close();
  }

}

