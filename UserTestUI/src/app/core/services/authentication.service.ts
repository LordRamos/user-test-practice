import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { TokenStorageService } from './token-storage.service';
import { User } from '../models/user';


@Injectable()
export class AuthenticationService {

  private httpOptions: any;
  public token: string;
  public token_expires: Date;
  public username: string;
  public errors: any = [];

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  }
  public login(user: User) {
    return this.http.post(`${environment.apiUrl}auth/`, user, this.httpOptions)
  }


  public refreshToken() {
    this.http.post(`${environment.apiUrl}auth/`, { refresh: this.tokenStorageService.getRefreshToken }, this.httpOptions).subscribe(
      data => {
        this.tokenStorageService.setAccessToken(data['access']);
      },
      err => {
        this.errors = err['error'];
      }
    );
  }

  public logout() {
    this.tokenStorageService.clear();
  }

  private isTokenExpired(token: string) {

    this.token = this.tokenStorageService.getAccessToken;
    this.errors = [];
    const token_parts = this.token.split(/\./);
    const token_decoded = JSON.parse(window.atob(token_parts[1]));
    // this.token_expires = new Date(token_decoded.exp * 1000);
    const expired = token_decoded - Date.now() / 1000 <= 0;
    return expired;
  }
  private isAuthorized() {
    return !this.isTokenExpired(this.tokenStorageService.getAccessToken)
  }

}