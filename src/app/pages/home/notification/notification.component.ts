import { Component, OnInit } from '@angular/core';
import { WalletWithdrawServiceService } from 'src/app/services/wallet-withdraw-service/wallet-withdraw-service.service';
import { SUCCESS } from '../../constant/response-status.const';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  walletHistory : any[] = [];
  withdrawHistory : any[] = [];
  totalAmount : any = 0;

  constructor (
    private walletService : WalletWithdrawServiceService
  ) {
    this.walletService.userTotalAmount$.subscribe((amount) => this.totalAmount = amount);
  }

  ngOnInit(): void {
    this.getWalletHistory();
    this.getWithdrawHistory();
  }

  // get wallet history
  getWalletHistory() {
    this.walletHistory = [];
    this.walletService.walletHistory().subscribe((response) => {
      if(response?.status == SUCCESS) {
        this.walletHistory = response?.payload?.data;
        this.walletHistory = this.walletHistory.reverse();
      } else {
        this.walletHistory = [];
      }
    }, (error) => {
      this.walletHistory = [];
    });
  }

  // get wallet history
  getWithdrawHistory() {
    this.withdrawHistory = [];
    this.walletService.withdrawHistory().subscribe((response) => {
      if(response?.status == SUCCESS) {
        this.withdrawHistory = response?.payload?.data;
        this.withdrawHistory = this.withdrawHistory.reverse();
      } else {
        this.withdrawHistory = [];
      }
    }, (error) => {
      this.withdrawHistory = [];
    });
  }
}
