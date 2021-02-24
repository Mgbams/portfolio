import { Injectable } from '@angular/core';
import {Observable, throwError, of} from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import {  Contact } from './../models/contact.model';

import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SendEmailService {
  baseUrl = 'http://localhost:8000/api/send/email';

  constructor(private http: HttpClient) { }

  sendEmail(contact: Contact): Observable<Contact> {
    const httpOptions = {
        headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods' : 'GET, POST, PUT, DELETE'
        })
    };

    return this.http.post<Contact>(`${this.baseUrl}`, JSON.stringify(contact), httpOptions).pipe(catchError(this.handleError));
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
