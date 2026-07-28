import { Injectable } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { PathConfig } from '../../core/config/pathConfig';

@Injectable({
  providedIn: 'root'
})
export class OffersService {

  constructor(
    private httpService: HttpService
  ) { }

  public createOffer(data:any){
    return this.httpService.post(PathConfig.CREATE_OFFER, data)
  }

  public updateOfferDetails(offerId: string, data:any){
    return this.httpService.put(`${PathConfig.UPDATE_OFFERS}/${offerId}`, data)
  }

  public getOffers(){
    return this.httpService.get(PathConfig.GET_ALL_OFFER);
  }

  public getOfferDetails(){
    return this.httpService.get(PathConfig.CREATE_OFFER);
  }

  public deleteOffersDetails(id:string){
    return this.httpService.delete(`${PathConfig.DELETE_OFFER}/${id}`);
  }
}
