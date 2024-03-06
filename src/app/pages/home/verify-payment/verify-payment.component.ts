import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WalletWithdrawServiceService } from 'src/app/services/wallet-withdraw-service/wallet-withdraw-service.service';
import { SUCCESS } from '../../constant/response-status.const';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-verify-payment',
  templateUrl: './verify-payment.component.html',
  styleUrls: ['./verify-payment.component.scss']
})
export class VerifyPaymentComponent {

  orderID : any

  constructor(
    private route: ActivatedRoute,
    private walletwithdrawservice : WalletWithdrawServiceService,
    private notificationService: NotificationService,
    private router: Router,
  ) {
    this.route.params.subscribe((params: any) => {
      console.log(params['id'])
      this.orderID = params['id'];
    })
  }

  ngOnInit(): void {
    this.getVerifyPayment();
  }

  getVerifyPayment() {
    this.walletwithdrawservice.getverifyPayment(this.orderID).subscribe((response) => {
      if (response?.status == SUCCESS) {
        this.walletwithdrawservice.getWalletAmount();
        this.router.navigateByUrl('/home/transition-history');
        this.notificationService.showSuccess('Payment Verify Successfully.');
      } else {
        this.notificationService.showError('Something went wrong');
      }
    }, (error) => {
      this.notificationService.showError('Something went wrong');
    });
  }

}
