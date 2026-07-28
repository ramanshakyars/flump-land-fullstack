import { Injectable } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { PathConfig } from '../../core/config/pathConfig';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private httpService: HttpService) { }

  public getAllInventory() {
    const options = {};
    return this.httpService.get(PathConfig.GET_ALL_INVENTORY, options);
  }

  public deleteInventory(id: string) {
    const options = {};
    const url = PathConfig.DELETE_INVENTORY + '/' + id;
    return this.httpService.delete(url, options);
  }

  public createInventory(data: any) {
    const options = {};
    return this.httpService.post(PathConfig.CREATE_INVENTORY, data, options);
  }

  public updateInventory(data: any, id: string) {
    const options = {};
    const url = PathConfig.UPDATE_INVENTORY + '/' + id;
    return this.httpService.put(url, data, options);
  }

  public getInventoryById(id: any) {
    const options = {};
    const url = PathConfig.GET_BY_ID_INVENTORY + '/' + id;
    return this.httpService.get(url, options);
  }
}
