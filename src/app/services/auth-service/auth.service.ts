
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { HttpClient } from '@angular/common/http';

export enum AuthEndPoint {
  REGISTER_USER = '/user/auth/register',
  LOGIN_USER = '/user/auth/login',
  VERIFY_EMAIL = '/user/auth/verify',
  FORGOT_PASSWORD = '/user/auth/forgot-password',
  UPDATE_USER_LUDO_NAME = "/user/update-ludo-name",
  GET_CONTACT_DETAILS = "/user-common/contact-us",
  UPDATE_USER_DETAILS = "/user/user-update",
  VERIFY_OTP = '/user/auth/verify-otp',
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl!: string;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
    this.baseUrl = environment.baseUrl;
  }

  registerUser(payload: any): Observable<any> {
    return this.httpClient
      .post<any>(this.baseUrl + AuthEndPoint.REGISTER_USER, payload);
  }

  login(payload: any): Observable<any> {
    return this.httpClient
      .post<any>(this.baseUrl + AuthEndPoint.LOGIN_USER, payload);
  }

  verifyOTP(payload: any): Observable<any> {
    return this.httpClient
      .post<any>(this.baseUrl + AuthEndPoint.VERIFY_OTP, payload);
  }

  logout(): void {
    this.localStorageService.clearStorage();
    this.router.navigateByUrl('/');
  }

  verifyEmail(payload: any): Observable<any> {
    return this.httpClient
      .post<any>(this.baseUrl + AuthEndPoint.VERIFY_EMAIL, payload);
  }

  forgotPassword(payload: any): Observable<any> {
    return this.httpClient
      .post<any>(this.baseUrl + AuthEndPoint.FORGOT_PASSWORD, payload);
  }

  // update user ludo name
  updateLudoName(payload: any): Observable<any> {
    return this.httpClient
      .post<any>(this.baseUrl + AuthEndPoint.UPDATE_USER_LUDO_NAME, payload);
  }

  //  get contact details
  getContactDetails(): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + AuthEndPoint.GET_CONTACT_DETAILS);
  }

  // update user ludo name
  updateUserDetails(payload: any): Observable<any> {
    return this.httpClient
      .post<any>(this.baseUrl + AuthEndPoint.UPDATE_USER_DETAILS, payload);
  }
}
