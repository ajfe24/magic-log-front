import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';
import {environment} from "../../../environments/environment";

export class Tokens {
  jwt!: string;
  refreshToken!: string;
}

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private readonly JWT_TOKEN = 'TOKEN_LOG';



  constructor(private http: HttpClient) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.getJwtToken()) {
      // @ts-ignore
      request = this.addToken(request, this.getJwtToken());
    }

    return next.handle(request).pipe(catchError(error => {
      return throwError(error);
    }));
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }




  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

}
