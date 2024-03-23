import { Payload } from './../../constant/payload.const';
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
  accountDetails : any;
  withdrawAmount: FormControl = new FormControl('');
  bankDetails : any;
  showDetails : boolean = false;

  constructor(
    private localStorageService: LocalStorageService,
    private walletService: WalletWithdrawServiceService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.loginUser = this.localStorageService.getLogger();
  }

  ngOnInit(): void {
    this.getAccountDetails();
  }

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

  getAccountDetails() {
    this.walletService.getAccountDetails().subscribe((response) => {
      console.log(response);
      if(response?.status == SUCCESS) {
          this.bankDetails = response?.payload?.data;
          if(this.bankDetails) {
            this.showDetails = false;
          } else {
            this.showDetails = true;
          }
          this.withdrawForm.get('email')?.setValue(response?.payload?.data?.email || null);
          this.withdrawForm.get('mobile_no')?.setValue(response?.payload?.data?.mobile_no || null);
          this.withdrawForm.get('account_no')?.setValue(response?.payload?.data?.account_no || null);
          this.withdrawForm.get('ifsc')?.setValue(response?.payload?.data?.ifsc || null);
          this.withdrawForm.get('branch')?.setValue(response?.payload?.data?.branch || null);
          this.withdrawForm.get('bank_name')?.setValue(response?.payload?.data?.bank_name || null);
          this.withdrawForm.get('upi')?.setValue(response?.payload?.data?.upi || null);
      }
    });
  }

  //  add wallet amount
  withdrawRequest() {
    this.withdrawForm.markAllAsTouched();
    if (!this.withdrawAmount.value) {
      return this.notificationService.showError('Please Enter Amount');
    }
    if (!this.withdrawForm.get('email')?.value ||  !this.withdrawForm.get('mobile_no')?.value || !this.withdrawForm.get('account_no')?.value || !this.withdrawForm.get('ifsc')?.value || !this.withdrawForm.get('branch')?.value || !this.withdrawForm.get('bank_name')?.value || !this.withdrawForm.get('upi')?.value) {
      return this.notificationService.showError('Please Fill The Bank Details');
    }

    this.walletService.withdrawRequest({ user_id: this.loginUser?.id, amount: String(this.withdrawAmount.value), ...this.withdrawForm.value }).subscribe((response) => {
      console.log('response', response);
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
