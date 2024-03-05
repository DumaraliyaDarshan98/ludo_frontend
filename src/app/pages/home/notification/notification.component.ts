import { Component, OnInit } from '@angular/core';
import { WalletWithdrawServiceService } from 'src/app/services/wallet-withdraw-service/wallet-withdraw-service.service';
import { SUCCESS } from '../../constant/response-status.const';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notificationList : any[] = [];

  constructor (
    private walletService : WalletWithdrawServiceService
  ) {}

  ngOnInit(): void {
    this.getNotification();
  }

  // get wallet history
  getNotification() {
    this.notificationList = [];
    this.walletService.notificationList().subscribe((response) => {
      if(response?.status == SUCCESS) {
        this.notificationList = response?.payload?.data;
        this.notificationList = this.notificationList.reverse();
      } else {
        this.notificationList = [];
      }
    }, (error) => {
      this.notificationList = [];
    });
  }
}
