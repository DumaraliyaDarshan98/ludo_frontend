import { NotificationService } from './../../../services/notification/notification.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { WalletWithdrawServiceService } from 'src/app/services/wallet-withdraw-service/wallet-withdraw-service.service';
import { SUCCESS } from '../../constant/response-status.const';

@Component({
  selector: 'app-add-wallet',
  templateUrl: './add-wallet.component.html',
  styleUrls: ['./add-wallet.component.scss']
})
export class AddWalletComponent  implements OnInit {
  loginUser!: any;

  walletAmount : FormControl = new FormControl('');

  constructor(
    private localStorageService: LocalStorageService,
    private walletService : WalletWithdrawServiceService,
    private router: Router,
    private notificationService : NotificationService
  ) {
    this.loginUser = this.localStorageService.getLogger();
  }

  ngOnInit(): void {}

  // Set amount
  setAmount(amount : number) {
    this.walletAmount.setValue(amount);
  }

  //  add wallet amount
  addWallet() {
    if(!this.walletAmount.value) {
      return this.notificationService.showError('Please Enter Amount');
    }
    const payload = {
      user_id : this.loginUser?.id,
      amount : String(this.walletAmount.value)
    }
    this.walletService.addWallet(payload).subscribe((response) => {
      console.log('response', response)
      if(response?.status == SUCCESS) {
        this.walletAmount.setValue('');
        window.open(response?.payload?.data?.link_url);
        // this.router.navigate(['/home/transition-history']);
      } else {
        this.notificationService.showError('Something Went Wrong');
      }
    }, (error) => {
      this.notificationService.showError('Something Went Wrong');
    });
  }
}
