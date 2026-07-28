import { Injectable } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Observable } from 'rxjs';
import { PathConfig } from '../../core/config/pathConfig';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private httpService: HttpService) {}

  getAttendanceInventoryData(id: string): Observable<any> {
    const url = `${PathConfig.GET_INVENTORY_FROM_ATTENDANCE}/${id}`;
    return this.httpService.get(url);
  }
}
