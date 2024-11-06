import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { API_URL_ORDER } from 'src/app/constants/url';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    private apiUrl = API_URL_ORDER + '/order/saveOrder';

    constructor(private http: HttpClient) { }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': 'http://localhost:4200'
        })
    };

    saveOrder(data: any): Observable<any> {
        return this.http.post<any>(this.apiUrl, data)
            .pipe(
                catchError(this.handleError)
            );
    }

    private handleError(error: any): Observable<never> {
        console.error('An error occurred:', error);
        return throwError(() => new Error('Something went wrong; please try again later.'));
    }
}