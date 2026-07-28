import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { MsgService } from '../../services/msg.service';
import { PathConfig } from '../../core/config/pathConfig';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-view-history',
  standalone: false,
  templateUrl: './view-history.component.html',
  styleUrls: ['./view-history.component.scss']
})
export class ViewHistoryComponent implements OnInit {

  userId!: string;
  attendanceData: Array<any> = [];

  displayedColumns: string[] = ['CheckIn Time', 'CheckedOut Time','Activity Name'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService,
    private msgService: MsgService
  ) {
    this.dataSource = new MatTableDataSource(this.attendanceData);
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id') || '';
    if (this.userId) {
      this.fetchUserAttendance(this.userId, { page: 0, pageSize: 10 });
    } else {
      this.msgService.typeError("Invalid user ID");
    }
  }

  fetchUserAttendance(userId: string, payload: { page: number; pageSize: number }){
    this.httpService.post(`${PathConfig.GET_ALL_ATTENANCE_INFO}/${userId}`, payload)
      .subscribe({
        next: (res) => {
          if (res && res.attendanceList) {
            this.attendanceData = res.attendanceList;
            this.dataSource = new MatTableDataSource(this.attendanceData);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
        },
        error: () => {
          this.msgService.typeError("Error while fetching attendance information");
        }
      });
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getActivityNames(activities: any[]): string {
    return activities.map(a => a.activityName).join(', ');
  }

  
}
