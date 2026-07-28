import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PathConfig } from '../../core/config/pathConfig';
import { HttpService } from '../../services/http.service';
import { ToastrService } from 'ngx-toastr';
import { MsgService } from '../../services/msg.service';

@Component({
  selector: 'app-activity',
  standalone: false,
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.scss'
})
export class ActivityComponent implements OnInit {
  displayedColumns: string[] = ['activityName', 'price', 'actions'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
  formGroup!: FormGroup;
  activityList: any
  dialogRef!: MatDialogRef<any>;
  dialogTitle: string = 'Add New Activity';
  saveButtonLabel: string = 'Save';
  currentActivityId: string | null = null;
  constructor(
    private dialog: MatDialog, 
    private fb: FormBuilder, 
    private httpService: HttpService,
     private msgService: MsgService) {

  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      activityName: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required]],
    });
    this.getActivity();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(activity?: any): void {
    this.formGroup.reset();
    if (activity) {
      this.currentActivityId = activity.id;
      this.formGroup.patchValue({
        activityName: activity.activityName,
        price: activity.price,
      });
      this.dialogTitle = 'Update Activity';
      this.saveButtonLabel = 'Update';
    } else {
      this.currentActivityId = null;
      this.dialogTitle = 'Add New Activity';
      this.saveButtonLabel = 'Save';
    }
    this.dialogRef = this.dialog.open(this.dialogTemplate, {
      width: '400px',
      disableClose: true,
    });
  }
  

  getActivity() {
    const url = `${PathConfig.GET_ACTIVITY}`;
    this.httpService.get(url, '').subscribe({
      next: (response) => {
        this.activityList = response;
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => {
        this.msgService.typeError('Failed to load activities');
      },
    });
  }

  save(): void {
    if (this.formGroup.valid) {
      const activityData = this.formGroup.value;
      if (this.currentActivityId) {
        // Edit existing activity
        const url = `${PathConfig.EDIT_ACTIVITY}/${this.currentActivityId}`;
        this.httpService.put(url, activityData, '').subscribe({
          next: () => {
            this.msgService.typeSuccess('Activity updated successfully');
            this.dialogRef.close();
            this.getActivity();
          },
          error: () => {
            this.msgService.typeError('Something went wrong');
          },
        });
      } else {
        // Add new activity
        const url = `${PathConfig.ADD_ACTIVITY}`;
        this.httpService.post(url, activityData, '').subscribe({
          next: () => {
            this.msgService.typeSuccess('Activity added successfully');
            this.dialogRef.close();
            this.getActivity();
          },
          error: () => {
            this.msgService.typeError('Something went wrong');
          },
        });
      }
    }
  }

  deleteActivity(id:string){
    const url = `${PathConfig.DELETE_ACTIVITY}/${id}`;
    this.httpService.delete(url,'').subscribe({
      next: (res) => {
        this.msgService.typeSuccess('Activity deleted Successfully');     
        this.getActivity(); 
      },
      error: (error) => {
        this.msgService.typeError('Something went wrong');
      },
    });
    
  }

  editActivity(id:string){
    const url = `${PathConfig.EDIT_ACTIVITY}/${id}`;
    this.httpService.post(url, this.formGroup.value, '').subscribe({
      next: (res) => {
        this.msgService.typeSuccess('Activity updated Successfully');
        this.dialogRef.close(); // Close the dialog after successful save
        this.getActivity(); // Refresh the activity list
      },
      error: (error) => {
        this.msgService.typeError('Something went wrong');
      },
    });
  }

}

