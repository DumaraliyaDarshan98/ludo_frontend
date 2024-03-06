import { WalletWithdrawServiceService } from 'src/app/services/wallet-withdraw-service/wallet-withdraw-service.service';
import { LocalStorageService } from './../../../services/local-storage/local-storage.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KycModalComponent } from '../kyc-modal/kyc-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SUCCESS } from '../../constant/response-status.const';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit{
  loginUser : any;
  notificationDetails : any;

  constructor(
    private localStorageService : LocalStorageService,
    private router: Router,
    private modalService: NgbModal,
    private walletService :  WalletWithdrawServiceService
  ) {
    this.loginUser = this.localStorageService.getLogger();
  }

  ngOnInit(): void {
      this.getPageNotification();
  }

  public playGame() {
    if(this.loginUser) {
      this.router.navigate(['/home/game-home']);
    } else {
      this.router.navigate(['/login'])
    }
  }

  public kycModal() {
    const modalRef = this.modalService.open(KycModalComponent, {size:'md', windowClass: 'modal-dialog-centered'});
    // this.router.navigate(['/kyc']);
  }

  getPageNotification() {
    this.walletService.getPageNotification().subscribe((response) => {
      if(response?.status == SUCCESS) {
        this.notificationDetails = response?.payload?.data?.find((ele: any) => ele.page == 'Home');
        console.log('this.notificationDetails', this.notificationDetails)
      }
    })
  }
}
