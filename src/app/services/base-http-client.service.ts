import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpBackend, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from "rxjs/operators";
import { throwError, Observable, of, pipe } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BaseHttpClientService {
  private externalHttpClient: HttpClient;
  constructor(private _httpClient: HttpClient,
    handler: HttpBackend
  ) {
    this.externalHttpClient = new HttpClient(handler);
  }
  private retryLimit = 1;
  /** To process get request */
  getData<T>(url: string) {
    url = url;

    return this._httpClient.get<T>(url, this.prepareHeader(null))
    .pipe(
      catchError(this.handleError));
  }

  /** To process post request */
  postData<T>(url: string, data) {
    url =  url;
    return this._httpClient.post<T>(url, JSON.stringify(data), this.prepareHeader(null))
    .pipe(
      catchError(this.handleError));
  }

  /** To process put request */
  putData<T>(url: string, data) {
    url = url;
    return this._httpClient.put<T>(url, JSON.stringify(data), this.prepareHeader(null))
    .pipe(
      catchError(this.handleError));
  }
  
   /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */

private handleError<T>(error: HttpErrorResponse) {
  console.log(error, "error")
  return throwError(error);
  }


// private handleError<T>(operation = 'operation', result?: T) {
//   return (error: any): Observable<T> => {
//     console.error(error); 
//     return of(result as T);
//   };
// }

  private prepareHeader(headers: HttpHeaders | null): object {
    headers = headers || new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Accept', 'application/json');
    return {
      headers: headers
    }
  }
}