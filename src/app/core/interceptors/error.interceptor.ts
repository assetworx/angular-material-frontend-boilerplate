import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retryWhen, delay, take, catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  /**
   * 1. 401 -> Logout
   * 2. Other -> Retry 3 times
   *
   * @param {HttpRequest<unknown>} request
   * @param {HttpHandler} next
   * @return {*}  {Observable<HttpEvent<unknown>>}
   * @memberof ErrorInterceptor
   */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      retryWhen(errors => errors.pipe(
        delay(1000),
        take(3),
        catchError(err => {
          if (err.status === 401) {
            this.authService.logout();
            return throwError('Token invalid!');
          }
          return throwError(err);
        })
      ))
    );
  }
}
