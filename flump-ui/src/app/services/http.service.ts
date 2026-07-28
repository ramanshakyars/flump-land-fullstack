import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  errorMessage: string = 'Server Error';

  constructor(private httpClient: HttpClient) {}

  get(endpoint: string, options?: any): Observable<any> {
    return this.httpClient.get(endpoint, options).pipe(
      map((res: any) => res),
      catchError((err: any) => {
        return throwError(() => {
          return { error: err['error'] || this.errorMessage };
        });
      })
    );
  }

  post(endpoint: string, obj: any, options?: any): Observable<any> {
    return this.httpClient.post(endpoint, obj, options).pipe(
      map((res: any) => res),
      catchError((err: any) => {
        return throwError(() => {
          return { error: err['error'] || this.errorMessage };
        });
      })
    );
  }

  put(endpoint: string, obj: any, options?: any): Observable<any> {
    return this.httpClient.put(endpoint, obj, options).pipe(
      map((res: any) => res),
      catchError((err: any) => {
        return throwError(() => {
          return { error: err['error'] || this.errorMessage };
        });
      })
    );
  }

  patch(endpoint: string, obj: any, options?: any): Observable<any> {
    return this.httpClient.patch(endpoint, obj, options).pipe(
      map((res: any) => res),
      catchError((err: any) => {
        return throwError(() => {
          return { error: err['error'] || this.errorMessage };
        });
      })
    );
  }

  delete(endpoint: string, options?: any): Observable<any> {
    return this.httpClient.delete(endpoint, options).pipe(
      map((res: any) => res),
      catchError((err: any) => {
        return throwError(() => {
          return { error: err['error'] || this.errorMessage };
        });
      })
    );
  }
}
