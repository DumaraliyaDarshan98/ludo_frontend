import { WalletWithdrawServiceService } from 'src/app/services/wallet-withdraw-service/wallet-withdraw-service.service';
import { GameService } from 'src/app/services/game-service/game.service';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SUCCESS } from 'src/app/pages/constant/response-status.const';
import { FormControl } from '@angular/forms';
import { ShowGameCodeService } from 'src/app/services/show-game-code/show-game-code.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-cancel',
  templateUrl: './cancel.component.html',
  styleUrls: ['./cancel.component.css']
})
export class CancelComponent implements OnInit {
  reasonList : any[] = [];
  battleId: any;
  reason_control: FormControl = new FormControl('');

  constructor(
    private activeModal: NgbActiveModal,
    private gameService : GameService,
    private showGameCodeService : ShowGameCodeService,
    private notificationService : NotificationService,
    private walletService : WalletWithdrawServiceService,
  ) { }

  ngOnInit() {
    this.getReasonList();
  }

  submit() {
    console.log('reason_control', this.reason_control.value);
    const cancelDetails = this.reasonList?.find((element) => element.id == this.reason_control.value);
    const payload = {
      game_table_id : this.battleId,
      cancel_reasone : cancelDetails?.reason,
      cancel_type : cancelDetails?.reason_type
    }

    this.showGameCodeService.cancel(payload).subscribe((response) => {
      if(response?.status == SUCCESS) {
        this.notificationService.showSuccess('You Cancel the game');
        this.walletService.getWalletAmount();
        this.closePopUp();
      } else {
        this.notificationService.showError('Please After After Some Time');
      }
    }, (error) => {
      this.notificationService.showError(error?.error?.error?.message  || 'Error');
    });

  }

  closePopUp(result?: any) {
    this.activeModal.close(result);
  }

  // get cancel result list
  getReasonList() {
    this.reasonList = [];
    this.gameService.getCancelReasonList().subscribe((response) => {
      if(response?.status == SUCCESS) {
        this.reasonList = response?.payload?.data;
        console.log('this.reasonList', this.reasonList);
      }
    });
  }
}
