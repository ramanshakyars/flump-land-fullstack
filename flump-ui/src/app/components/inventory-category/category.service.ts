import { Injectable } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { PathConfig } from '../../core/config/pathConfig';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpService: HttpService) { }

  public getAllCategory() {
    const options = {};
    return this.httpService.get(PathConfig.GET_ALL_CATEGORY, options);
  }

  public createCategory(data: any) {
    return this.httpService.post(PathConfig.CREATE_CATEGORY, data);
  }

  public updateCategory(data: any, id: string) {
    const options = {};
    const url = PathConfig.UPDATE_CATEGORY + '/' + id;
    return this.httpService.put(url, data, options);
  }

  public deleteCategory(id: string) {
    const options = {};
    const url = PathConfig.DELETE_CATEGORY + '/' + id;
    return this.httpService.delete(url, options);
  }

  public getCategoryById(id: any) {
    const options = {};
    const url = PathConfig.GET_BY_ID_CATEGORY + '/' + id;
    return this.httpService.get(url, options);
  }
}
