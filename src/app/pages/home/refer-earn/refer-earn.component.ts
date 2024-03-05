import { WalletWithdrawServiceService } from 'src/app/services/wallet-withdraw-service/wallet-withdraw-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { SUCCESS } from '../../constant/response-status.const';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { Clipboard } from '@angular/cdk/clipboard';
@Component({
  selector: 'app-refer-earn',
  templateUrl: './refer-earn.component.html',
  styleUrls: ['./refer-earn.component.scss']
})
export class ReferEarnComponent implements OnInit {

  referCommission : any;
  loginUser : any;

  constructor(
    private router: Router,
    private walletService : WalletWithdrawServiceService,
    private notificationService  : NotificationService,
    private localStorageService: LocalStorageService,
    private clipboard: Clipboard
  ) {
    this.loginUser = this.localStorageService.getLogger();
  }

  ngOnInit(): void {
    this.getReferCommission();
  }

  getReferCommission() {
    this.walletService.getReferCommission().subscribe((response) => {
      if(response?.status == SUCCESS) {
        this.notificationService.showSuccess('Get Successfully Refer Commission');
        this.referCommission = response?.payload?.data;
      } else {
        this.notificationService.showError('Error');
      }
    }, (error) => {
      this.notificationService.showError('Error');
    });
  }

  copyToClipboard() {
    this.clipboard.copy(this.loginUser?.refer_code);
    this.notificationService.showSuccess('Copied');
  }

  shareOnWhatsApp() {
    const url = 'https://web.whatsapp.com/';
    window.open(url, '_blank');
  }
}
