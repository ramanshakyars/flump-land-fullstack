import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { PathConfig } from '../../core/config/pathConfig';
import { HttpService } from '../../services/http.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MsgService } from '../../services/msg.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
interface BillingData {
  name: string;
  totalAmount: number;
  paymentMode: string;
  billDate: Date;
}

@Component({
  selector: 'app-billing',
  standalone: false,
  templateUrl: './billing.component.html',
  styleUrl: './billing.component.scss'
})


export class BillingComponent implements OnInit {

  displayedColumns: string[] = ['userName', 'totalAmount', 'paymentMode', 'billDate', 'actions'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  totalRecords = 0;
  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;

  constructor(private httpService: HttpService, private msgService: MsgService, private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.getBillingData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getBillingData() {
    const url = `${PathConfig.GET_BILLS}`;
    const requestBody = {
      pageSize: 5,
      page: this.paginator?.pageIndex || 0,
    };

    this.httpService.post(url, requestBody).subscribe({
      next: (response) => {
        this.dataSource.data = response.billingList;
        this.totalRecords = response.totalRecords;
      },
      error: () => {
        console.error('Failed to load billing data');
      },
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  viewDetails(element: any): void {
    this.dialogRef = this.dialog.open(this.dialogTemplate, {
      width: '1000px',
      disableClose: true,
      data: element,
      panelClass: 'custom-dialog-container'
    })
  }




}
