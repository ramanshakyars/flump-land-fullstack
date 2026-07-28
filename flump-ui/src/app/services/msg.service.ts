import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class MsgService {
  [x: string]: any;
  constructor(private toaster: ToastrService) {}

  typeSuccess(message: string, tittle?: string) {
    this.toaster.success(message, tittle || '', {
      timeOut: 1000,
      progressBar: true,
      progressAnimation: 'increasing',
      positionClass: 'toast-top-right',
    });
  }

  typeInfo(message: string, tittle?: string) {
    this.toaster.info(message, tittle || '', {
      timeOut: 1000,
      progressBar: true,
      progressAnimation: 'increasing',
      positionClass: 'toast-top-right',
    });
  }

  typeError(message: string, tittle?: string) {
    this.toaster.error(message, tittle || '', {
      timeOut: 1000,
      progressBar: true,
      progressAnimation: 'increasing',
      positionClass: 'toast-top-right',
    });
  }
}
