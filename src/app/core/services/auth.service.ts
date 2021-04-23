import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { shareReplay, tap } from 'rxjs/operators';
import jwt_decode from "jwt-decode";
import { environment } from '../../../environments/environment';
import * as dayjs from 'dayjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) { }

  /**
   * Login as an user
   *
   * @param {string} email
   * @param {string} password
   * @return {*} 
   * @memberof AuthService
   */
  login(email: string, password: string) {
    const url = `${environment.auth_api_url}/login`
    return this.http.post<any>(url, {email, password})
      .pipe(
        tap(res => this._setSession(res)),
        shareReplay(),
        tap(res => this.snackBar.open('Succesfully logged in!'))
      )
  }

    
  /**
   * Logout by nuking local storage and redirecting to login page
   *
   * @memberof AuthService
   */
   logout() {
    localStorage.clear()
    this.router.navigate(['users/login'])
    this.snackBar.open('Succesfully logged out!')
  }


  /**
   * Registers an user
   *
   * @param {string} email
   * @param {string} password
   * @return {*} 
   * @memberof AuthService
   */
  register(email: string, password: string) {
    const url = `${environment.auth_api_url}/register`
    return this.http.post<any>(url, {email, password})
      .pipe(
        tap(res => this._setSession(res)),
        shareReplay(),
        tap(res => this.snackBar.open('Succesfully logged registered!'))
      )
  }


  /**
   * Sets the session by storing the access token and expiry date in localstorage.
   *
   * @private
   * @param {*} auth
   * @param {boolean} bool
   * @memberof AuthService
   */
  private _setSession(auth: any): void {
    localStorage.setItem('id_token', JSON.stringify(auth));
    localStorage.setItem("expires_at", dayjs().add(1, 'week').unix().toString()); // REMOVE IN REAL SCENARIO
    try {
      const decoded: any = jwt_decode(auth)
      localStorage.setItem("expires_at", decoded?.exp);
    } catch(err) {
      this.logout
    }
  }


  /**
   * Returns (if exists) the access token in Bearer format
   *
   * @return {*}  {(string | null)}
   * @memberof AuthService
   */
  _getBearerToken(): string | null {
    const token = localStorage.getItem('id_token');
    if (token) {
      return `Bearer ${token}`;
    }
    return null;
  }


  /**
   * Checks the validity on token based on existance and expiry date
   *
   * @return {*}  {boolean}
   * @memberof AuthService
   */
  _isTokenValid(): boolean { 
    const token: string | null = localStorage.getItem('id_token');
    const expiry: number = Number(localStorage.getItem('expires_at'));
    const now = dayjs().unix();
    return token != null && expiry >= now
  }
}
