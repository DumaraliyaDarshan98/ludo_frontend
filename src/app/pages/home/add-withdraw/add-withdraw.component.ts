import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { WalletWithdrawServiceService } from 'src/app/services/wallet-withdraw-service/wallet-withdraw-service.service';
import { SUCCESS } from '../../constant/response-status.const';

@Component({
  selector: 'app-add-withdraw',
  templateUrl: './add-withdraw.component.html',
  styleUrls: ['./add-withdraw.component.scss']
})
export class AddWithdrawComponent implements OnInit {
  loginUser!: any;

  withdrawAmount: FormControl = new FormControl('');

  constructor(
    private localStorageService: LocalStorageService,
    private walletService: WalletWithdrawServiceService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.loginUser = this.localStorageService.getLogger();
  }

  ngOnInit(): void { }

  withDrawForm = {
    email: new FormControl(""),
    mobile_no: new FormControl(""),
    account_no: new FormControl(""),
    ifsc: new FormControl(""),
    branch: new FormControl(""),
    bank_name: new FormControl(""),
    upi: new FormControl(""),
  }

  withdrawForm = new FormGroup(this.withDrawForm, []);

  // Set amount
  setAmount(amount: number) {
    this.withdrawAmount.setValue(amount);
  }

  //  add wallet amount
  withdrawRequest() {
    if (!this.withdrawAmount.value) {
      return this.notificationService.showError('Please Enter Amount');
    }
    const payload = {
      user_id: this.loginUser?.id,
      amount: String(this.withdrawAmount.value),

    }
    this.walletService.withdrawRequest({ user_id: this.loginUser?.id, amount: String(this.withdrawAmount.value), ...this.withdrawForm.value }).subscribe((response) => {
      if (response?.status == SUCCESS) {
        this.withdrawAmount.setValue('');
        this.router.navigate(['/home/transition-history']);
      } else {
        this.notificationService.showError('Something Went Wrong');
      }
    }, (error) => {
      this.notificationService.showError('Something Went Wrong');
    });
  }

  NumberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
  }

}
