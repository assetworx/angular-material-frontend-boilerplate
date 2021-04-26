import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}


  /**
   * Intercepts each outgoing request and appends (if exists) the token to the Authorization header
   *
   * @param {HttpRequest<unknown>} request
   * @param {HttpHandler} next
   * @return {*}  {Observable<HttpEvent<unknown>>}
   * @memberof TokenInterceptor
   */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token: string | null = this.authService._getBearerToken();
    let authReq;
    if (token) {
      authReq = request.clone({
        headers: request.headers.set('Authorization', token)
      });
    }
    return next.handle(authReq ? authReq : request);
  }
}
