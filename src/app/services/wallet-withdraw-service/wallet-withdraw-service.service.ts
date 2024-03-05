import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { HttpClient } from '@angular/common/http';

export enum APIEndPOint {
  WALLET_HISTORY = "/user/wallet-history",
  WITHDRAW_HISTORY = "/user/withdraw-history",
  ADD_WALLET = "/user/add-wallet",
  WITHDRAW_REQUEST = "/user/withdraw-request",
  GET_WALLET_AMOUNT = "/user/wallet-amount",
  NOTIFICATION_LIST = "/notification/list",
  REFER_CODE_AND_COMMISSION = "/admin/refer-get-commission"
}

@Injectable({
  providedIn: 'root'
})
export class WalletWithdrawServiceService {
  baseUrl!: string;

  private userAmount = new BehaviorSubject<number>(0);
  userTotalAmount$ = this.userAmount.asObservable();

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
    this.baseUrl = environment.baseUrl;
  }

  addWallet(payload: any): Observable<any> {
    return this.httpClient
      .post<any>(this.baseUrl + APIEndPOint.ADD_WALLET, payload);
  }

  withdrawRequest(payload: any): Observable<any> {
    return this.httpClient
      .post<any>(this.baseUrl + APIEndPOint.WITHDRAW_REQUEST, payload);
  }

  walletHistory(): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + APIEndPOint.WALLET_HISTORY);
  }

  withdrawHistory(): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + APIEndPOint.WITHDRAW_HISTORY);
  }

  getWalletAmount() {
    this.httpClient
      .get<any>(this.baseUrl + APIEndPOint.GET_WALLET_AMOUNT).subscribe(response => {
        console.log('response wallet', response)
        this.setUserAmount(response?.payload?.data?.walletAmount)
      });
  }

  // set notification count
  setUserAmount(amount: number) {
    this.userAmount.next(amount);
  }

  // Get notification list
  notificationList() {
    return this.httpClient
      .get<any>(this.baseUrl + APIEndPOint.NOTIFICATION_LIST);
  }

  // get refer commission
  getReferCommission(): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + APIEndPOint.REFER_CODE_AND_COMMISSION);
  }
}
