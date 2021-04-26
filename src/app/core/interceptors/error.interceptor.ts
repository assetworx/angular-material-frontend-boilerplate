import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError, timer } from 'rxjs';
import { retryWhen, mergeMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  /**
   * Intercepts each http response and performs the following steps:
   * 
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
      retryWhen(
        genericRetryStrategy({excludedStatusCodes: [401]}, this.authService)
      )
    )
  }
}


export const genericRetryStrategy = ({
  maxRetryAttempts = 3,
  scalingDuration = 1000,
  excludedStatusCodes = []
}: {
  maxRetryAttempts?: number,
  scalingDuration?: number,
  excludedStatusCodes?: number[],
} = {}, authService: AuthService) => (attempts: Observable<any>) => {
  return attempts.pipe(
    mergeMap((error, i) => {
      const retryAttempt = i + 1;
      // If unauthorized
      if (excludedStatusCodes.find(e => e === error.status)) {
        authService.logout()
      }

      // If we capped on retry attempts
      if (retryAttempt > maxRetryAttempts) {
        return throwError(error);
      }

      // retry after 1s, 2s, etc...
      return timer(retryAttempt * scalingDuration);
    })
  );
};