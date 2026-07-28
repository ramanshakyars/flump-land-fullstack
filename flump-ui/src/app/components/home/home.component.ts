import {Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ChildrenFormDialogComponent } from './children-form-dialog/children-form-dialog.component';
import { HttpService } from '../../services/http.service';
import { MsgService } from '../../services/msg.service';
import { PathConfig } from '../../core/config/pathConfig';
import { FormControl, FormGroup } from '@angular/forms';
import { ItemsDialogComponent } from './items-dialog/items-dialog.component';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = [
    'fullName',
    'dateOfBirth',
    'fatherName',
    'mothersName',
    'parentContactNo',
    'checkIn',
    'addItems',
    'checkOut',
    'billing',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  checkInForm!: FormGroup;
  pageSizes = [5, 15, 25, 50];
  totalRecords = 0;
  searchControl = new FormControl<string>('');
  page = 0;
  pageSize = 5;
  readonly range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  constructor(
    private dialog: MatDialog,
    private httpService: HttpService,
    private msgService: MsgService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.getAllChildrenData();
    this.setupSearchListener();
    this.range.valueChanges.subscribe((range) => {
      if (range.start && range.end) {
        this.getAllChildrenData();
      }
    });

  }

  setupSearchListener(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        filter((value) => (value ?? '').length >= 2 || (value ?? '') === '')
      )
      .subscribe((searchText) => {
        this.page = 0;
        this.getAllChildrenData(searchText ?? '');
      });
  }

  setupDateRangeListener(): void {
    this.range.valueChanges.pipe(debounceTime(400)).subscribe((range) => {
      if (range.start && range.end) {
        this.page = 0;
        this.getAllChildrenData();
      }
    });
  }

  getAllChildrenData(search: string = '') {
    const { start, end } = this.range.value;
    const params = {
      page: this.page,
      pageSize: this.pageSize,
      searchText: search.trim(),
      startDate: start ? new Date(start).toISOString() : null,
      endData: end ? new Date(end).toISOString() : null,
    };
    this.httpService.post(PathConfig.GET_ALL_CHILDREN_DATA, params).subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res.userInfoList);
        this.totalRecords = res.totalRecords;
        if (this.paginator && this.sort) {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }

      },
      error: (err) => {
        console.error(err);
        this.msgService.typeError('Failed to fetch Children Data');
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchControl.setValue(filterValue, { emitEvent: true });
  }

  openDialog(action: string, editData: any) {
    const dialogRef = this.dialog.open(ChildrenFormDialogComponent, {
      maxWidth: '60vw',
      maxHeight: 'auto',
      height: 'auto',
      width: '100%',
      disableClose: true,
      data: {
        action: action,
        editData: editData,
      },
    });

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (action === 'add' && result != null) {
          this.postStudentData(PathConfig.POST_CHILDREN_DATA, result);
        }
        if (action === 'edit' && result != null) {
          const url = `${PathConfig.UPDATE_CHILDREN_DATA}/${result.id}`;
          this.updateStudentData(url, result);
        }
      },
      error: (error) => {
        this.msgService.typeError('Error', error);
      },
    });
  }

  postStudentData(url: string, data: any) {
    this.httpService.post(url, data).subscribe({
      next: (res) => {
        this.msgService.typeSuccess('Children Data Fetched Successfully');
        this.getAllChildrenData();
      },
      error: (err) => {
        this.msgService.typeError('Children Data Fetched Failed', err);
      },
    });
  }

  updateStudentData(url: string, data: any) {
    this.httpService.put(url, data).subscribe({
      next: (res) => {
        this.msgService.typeSuccess('Children Data Updated Successfully');
        this.getAllChildrenData();
      },
      error: (err) => {
        this.msgService.typeError('Children Data Fetched Failed', err);
      },
    });
  }

  checkIn(row: any) {
    this.httpService
      .post(PathConfig.POST_CHECK_IN, {
        userId: row.id,
        activities: [],
        inventories: [],
      })
      .subscribe({
        next: (res) => {
          this.getAllChildrenData();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  checkOut(row: any) {
    const attendance = row?.attendance?.find(
      (item: any) => item.checkOut === false
    );

    const url = `${PathConfig.POST_CHECK_OUT}/${attendance.attendanceId}`;
    this.httpService.post(url, {}).subscribe({
      next: (res) => {
        this.getAllChildrenData();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  openItemsDialog(data: any) {
    const pendingCheckOut = data?.attendance?.find(
      (item: any) => item.checkOut === false
    );
    const dialogRef = this.dialog.open(ItemsDialogComponent, {
      maxWidth: '60vw',
      maxHeight: 'auto',
      height: 'auto',
      width: '100%',
      data: {
        userId: data.id,
        attendanceId: pendingCheckOut.attendanceId,
      },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result != null) {
          this.updateAttendanceData(pendingCheckOut.attendanceId, result);
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  updateAttendanceData(id: string, data: any) {
    const url = `${PathConfig.UPDATE_ATTENDANCE}/${id}`;
    this.httpService.put(url, data).subscribe({
      next: (res) => {
        this.msgService.typeSuccess('Data Added Successfully');
        this.getAllChildrenData();
      },
      error: (err) => {
        console.log(err);
        this.msgService.typeError('Data Added Failed', err);
      },
    });
  }

  navigateToCreateBill(data: any) {
    const attendance = data?.attendance?.find(
      (item: any) => item.checkOut === false
    );

    this.router.navigate([`/create-bill/${attendance.attendanceId}`]);
  }

  navigateToViewHistory(data: any) {
    this.router.navigate([`/view-history/${data.id}`]);
  }

  onPageChange(event: any) {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getAllChildrenData(this.searchControl.value ?? '');
  }

  downloadExcel() {
    this.httpService.get(PathConfig.DOWNLOAD_EXCEL, { responseType: 'blob' })
      .subscribe({
        next: (blob) => {
          const a = document.createElement('a');
          const objectUrl = URL.createObjectURL(blob);
          a.href = objectUrl;
          a.download = 'ChildrenData.xlsx';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(objectUrl);
        },
        error: (err) => {
          console.error('Error downloading file', err);
          this.msgService.typeError('Failed to download Excel file');
        }
      });
  }

}
