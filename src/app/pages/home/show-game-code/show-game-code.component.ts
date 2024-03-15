import { NotificationService } from './../../../services/notification/notification.service';
import { GameService } from 'src/app/services/game-service/game.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SUCCESS } from '../../constant/response-status.const';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IWonComponent } from './i-won/i-won.component';
import { CancelComponent } from './cancel/cancel.component';
import { ILooseComponent } from './i-loose/i-loose.component';
import { Clipboard } from '@angular/cdk/clipboard';
import { WalletWithdrawServiceService } from 'src/app/services/wallet-withdraw-service/wallet-withdraw-service.service';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

@Component({
  selector: 'app-show-game-code',
  templateUrl: './show-game-code.component.html',
  styleUrls: ['./show-game-code.component.scss']
})
export class ShowGameCodeComponent implements OnInit {
  battleDetails: any;
  battleId: any;
  notificationDetails: any;
  loginUser: any;
  GameCode: string = "";
  loginGameUserDetails: any;
  opponentPlayerDetails : any;

  // game_code: FormControl = new FormControl('');
  gameCodeForm: FormGroup;


  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private notificationService: NotificationService,
    private router: Router,
    private modalService: NgbModal,
    private clipboard: Clipboard,
    private walletService: WalletWithdrawServiceService,
    private localStorageService: LocalStorageService,
    private fb: FormBuilder
  ) {
    this.loginUser = this.localStorageService.getLogger();
    this.gameService.gameCode$.subscribe((code) => this.GameCode = code);
    this.route.params.subscribe((params: any) => {
      console.log(typeof params['gameTableId'])
      this.battleId = params['gameTableId'];
    });

    this.gameCodeForm = this.fb.group({
      game_code: new FormControl('', Validators.compose([Validators.required, this.validateGameCode()]))
    });
  }

  validateGameCode(): ValidatorFn | any {
    return (control: FormControl): { [key: string]: any } | null => {
      const code = control.value;
      if (code && code.length === 8 && code.charAt(0) === '0') {
        return null; // Validation passed
      } else {
        return { invalidGameCode: true }; // Validation failed
      }
    };
  }

  NumberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  ngOnInit(): void {
    this.getBattleDetails();
    this.getPageNotification();
  }

  getBattleDetails() {
    this.gameService.getBattleById(this.battleId).subscribe((response) => {
      if (response?.status == SUCCESS) {
        this.battleDetails = response?.payload?.data;
        this.loginGameUserDetails = this.battleDetails?.gamePlayer?.find((element: any) => element.p_id == this.loginUser?.id);
        this.opponentPlayerDetails = this.battleDetails?.gamePlayer?.find((element: any) => element.p_id != this.loginUser?.id);
        console.log('this.loginGameUserDetails', this.loginGameUserDetails);

        this.GameCode = response?.payload?.data?.game_code;

        if (this.battleDetails?.is_running == 2) {
          this.router.navigateByUrl('/home/game-home');
        }

        // localStorage.setItem("id", this.battleId);
        console.log('this.battleDetails', this.battleDetails);
        this.notificationService.showSuccess('Game Code Found');
      } else {
        this.notificationService.showError('Something went wrong');
      }
    }, (error) => {
      this.notificationService.showError('Something went wrong');
    });
  }

  // open win modal
  openWinModal() {
    const modalRef = this.modalService.open(IWonComponent);

    modalRef.componentInstance.battleId = this.battleId;

    modalRef.result.then((result) => {
      if (result) {
        this.getBattleDetails();
      }
      console.log('openWinModal', result)
    })
  }

  // open cancel modal
  openCancelModal() {
    const modalRef = this.modalService.open(CancelComponent);

    modalRef.componentInstance.battleId = this.battleId;

    modalRef.result.then((result) => {
      console.log('openCancelModal ', result);
      if (result) {
        this.getBattleDetails();
      }
    })
  }

  // open loose modal
  openLooseModal() {
    const modalRef = this.modalService.open(ILooseComponent);

    modalRef.componentInstance.battleId = this.battleId;

    modalRef.result.then((result) => {
      if (result) {
        this.getBattleDetails();
      }
      console.log('openLooseModal', result)
    })
  }

  copyToClipboard() {
    if (!this.GameCode) {
      return this.notificationService.showError('Wait For The Game Code');
    }
    this.clipboard.copy(this.GameCode);
    this.notificationService.showSuccess('Copied');
  }

  // shareOnWhatsApp() {
  //   const url = 'https://web.whatsapp.com/';
  //   window.open(url, '_blank');
  // }

  shareOnWhatsApp() {
    if (!this.GameCode) {
      return this.notificationService.showError('Wait For The Game Code');
    }
    this.clipboard.copy(this.GameCode);

    // Share on WhatsApp
    const whatsappUrl = 'https://api.whatsapp.com/send?text=' + encodeURIComponent(this.GameCode);
    window.open(whatsappUrl, '_blank');
  }

  getPageNotification() {
    this.walletService.getPageNotification().subscribe((response) => {
      if (response?.status == SUCCESS) {
        this.notificationDetails = response?.payload?.data?.find((ele: any) => ele.page == 'GameCodePage');
        console.log('this.notificationDetails', this.notificationDetails)
      }
    })
  }

  enterGameCode() {
    this.gameCodeForm.markAllAsTouched();
    if (this.gameCodeForm.invalid) {
      return this.notificationService.showError('Please enter valid game code.');
    }
    if (!this.gameCodeForm.get('game_code')?.value) {
      return this.notificationService.showError('Please Enter Game Code');
    }
    const payload = {
      game_table_id: this.battleId,
      game_code: this.gameCodeForm.get('game_code')?.value,
      user_id: this.loginUser.id
    }
    this.gameService.enterGameCode(payload).subscribe((response) => {
      console.log('sdfsdfsdfsdfsdfsdfsdf', response);
      if (response?.status == SUCCESS) {
        this.notificationService.showSuccess('Generate Code Successfully');
      } else {
        this.notificationService.showError('Please Retry After Some Time!');
      }
    }, (error) => {
      this.notificationService.showError(error?.error?.error?.message || 'Something went wrong!');
    })
  }
}
