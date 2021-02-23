import { Injectable } from '@angular/core';
import {Observable, throwError, of} from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import {  Contact } from './../models/contact.model';

import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SendEmailService {

  constructor(private http: HttpClient) { }

  sendEmail(url, contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(url, contact, {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        }).pipe(catchError(this.handleError));
  }


  private handleError(errorResponse: HttpErrorResponse) {
      if(errorResponse.error instanceof ErrorEvent) {
        //Meaning it is a client side error or a network error
        console.error('Client side error', errorResponse.error.message);
      } else {
        //Meaning it is a server side error 
        console.error('Server side error', errorResponse);
      }
      
      return throwError("There is a problem with the service. We are notified and working on it. Please try again later!")
  }
}
