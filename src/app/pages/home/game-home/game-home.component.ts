import { NotificationService } from './../../../services/notification/notification.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { WalletWithdrawServiceService } from 'src/app/services/wallet-withdraw-service/wallet-withdraw-service.service';
import { GameService } from 'src/app/services/game-service/game.service';
import { SUCCESS } from '../../constant/response-status.const';
import { LudoGameNameComponent } from './ludo-game-name/ludo-game-name.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-game-home',
  templateUrl: './game-home.component.html',
  styleUrls: ['./game-home.component.scss']
})
export class GameHomeComponent implements OnInit {
  loginUser: any;
  walletAmount: any = 0;
  battleList: any[] = [];
  runningBattleList : any[] = [];
  notificationDetails : any;
  battleAmount: FormControl = new FormControl();

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private walletService: WalletWithdrawServiceService,
    private notificationService: NotificationService,
    private gameService: GameService,
    private modalService: NgbModal
  ) {
    this.loginUser = this.localStorageService.getLogger();
    this.walletService.userTotalAmount$.subscribe((amount) => this.walletAmount = amount);
    this.gameService.gameBattleList$.subscribe((list) => {
      this.battleList = list;
      this.runningBattleList = [];
      console.log('sdfsdfsdfsdfsdfsdfsdf', this.battleList)
      this.battleList?.map((element: any) => {
        if(element.status == 3 && ((element?.gamePlayer[0]?.p_id == this.loginUser?.id && element?.gamePlayer[0]?.p_status == 3) || (element?.gamePlayer[1]?.p_id == this.loginUser?.id && element?.gamePlayer[1]?.p_status == 3))) {
          this.runningBattleList.push(element)
        }
      });
      this.walletService.getWalletAmount();
      console.log('runningBattleList', this.runningBattleList)
    });
    // this.gameService.requestBattleList$.subscribe((list) => this.runningBattleList = list);
  }

  ngOnInit(): void {
    this.getBattleList();
    this.getPageNotification();
  }

  // go to rules page
  public rule() {
    this.router.navigate(['/home/rule']);
  }

  // get battle list
  public async getBattleList() {
    this.battleList = [];
    this.runningBattleList = [];
    this.gameService.getBattleList().subscribe((response) => {
      if (response?.status == SUCCESS) {
        // this.battleList = response?.payload?.data?.gameList || [];

        this.battleList = response?.payload?.data;
        console.log('this.battleList', this.battleList);

        this.battleList?.map((element: any) => {
          if(element.status == 3 && ((element?.gamePlayer[0]?.p_id == this.loginUser?.id && element?.gamePlayer[0]?.p_status == 3) || (element?.gamePlayer[1]?.p_id == this.loginUser?.id && element?.gamePlayer[1]?.p_status == 3))) {
            this.runningBattleList.push(element)
          }
        });

        // this.runningBattleList = response?.payload?.data?.runningGameList || [];
      } else {
        this.notificationService.showError('Something went wrong.');
      }
    }, (error) => {
      this.notificationService.showError('Something went wrong.');
    });
  }

  // Create battle
  public createBattle(): any {
    // const amount = Number(this.battleAmount.value);
    //   console.log('amount',  amount > 0, amount <= 0)
    // if(amount <= 0) {
    //   return this.notificationService.showError('Enter Valid AMount');
    // }

    if (!this.battleAmount.value) {
      console.log("Please Enter Battle Amount.");
      return this.notificationService.showError('Please Enter Battle Amount.');
    }

    if (this.battleAmount.value < 50) {
      console.log("Minimum Battle Amount must be 50.");
      return this.notificationService.showError('Minimum Battle Amount must be 50.');
    }

    if (this.battleAmount.value > Number(this.walletAmount)) {
      console.log("Please Check Wallet Amount.");
      return this.notificationService.showError('Please Add Amount In Wallet.');
    }

    let updatedName: any;

    if (!this.loginUser?.ludo_name) {
      const modalRef = this.modalService.open(LudoGameNameComponent);

      modalRef.result.then((result) => {
        if (result) {
          updatedName = result['ludo_name'];

          const payload = {
            user_id: this.loginUser?.id,
            amount: this.battleAmount.value,
            name: this.loginUser?.ludo_name || updatedName
          }

          this.gameService.createGameTable(payload).subscribe((response) => {
            if (response?.status == SUCCESS) {
              this.getBattleList()
              // this.router.navigate([`/home/show-game-code/${response?.payload?.data?.id}`]);
              this.notificationService.showSuccess(response?.message || 'Game created.');
            } else {
              this.notificationService.showError('Please Retry Game Not Created');
            }
          }, (error) => {
            this.notificationService.showError('Please Retry Game Not Created');
          });
        } else {
          console.log('result close', result);
          return this.notificationService.showError('Please Try After SomeTime');
        }
      });
    } else {
      const payload = {
        user_id: this.loginUser?.id,
        amount: this.battleAmount.value,
        name: this.loginUser?.ludo_name || updatedName
      }

      this.gameService.createGameTable(payload).subscribe((response) => {
        if (response?.status == SUCCESS) {
          this.getBattleList()
          // this.router.navigate([`/home/show-game-code/${response?.payload?.data?.id}`]);
          this.notificationService.showSuccess(response?.message || 'Game created.');
        } else {
          this.notificationService.showError('Please Retry Game Not Created');
        }
      }, (error) => {
        this.notificationService.showError('Please Retry Game Not Created');
      });
    }
  }

  // play game
  public playGame(battleId: number, amount: any) {
    if (!battleId) {
      return this.notificationService.showError('Error');
    }

    if (Number(amount) > Number(this.walletAmount)) {
      console.log("Please Check Wallet Amount.");
      return this.notificationService.showError('Please Add Amount In Wallet.');
    }

    let updatedName: any;

    if (!this.loginUser?.ludo_name) {
      const modalRef = this.modalService.open(LudoGameNameComponent);

      modalRef.result.then((result) => {
        if (result) {
          updatedName = result['ludo_name'];

          const payload = {
            battle_id: battleId,
            user_id: this.loginUser?.id,
            name: this.loginUser?.ludo_name || updatedName
          }

          this.gameService.playGame(payload).subscribe((response) => {
            if (response?.status == SUCCESS) {
              // this.getBattleList()
              // this.router.navigate([`/home/show-game-code/${battleId}`]);
            } else {
              this.notificationService.showError('Something Went Wrong');
            }
          }, (error) => {
            this.notificationService.showError('Something Went Wrong');
          });
        } else {
          return this.notificationService.showError('Please Try After SomeTime');
        }
      });
    } else {
      const payload = {
        battle_id: battleId,
        user_id: this.loginUser?.id,
        name: this.loginUser?.ludo_name || updatedName
      }

      this.gameService.playGame(payload).subscribe((response) => {
        if (response?.status == SUCCESS) {
          // this.getBattleList()
          // this.router.navigate([`/home/show-game-code/${battleId}`])
        } else {
          this.notificationService.showError('Something Went Wrong');
        }
      }, (error) => {
        this.notificationService.showError('Something Went Wrong');
      });
    }
  }

  // Start The game
  startGame(battleId : number) {
    this.gameService.startGame(battleId).subscribe((response) => {
      if (response?.status == SUCCESS) {
        this.notificationService.showSuccess('Start The Game');
      } else {
        this.notificationService.showError('Something Went Wrong');
      }
    }, (error) => {
      this.notificationService.showError('Something Went Wrong');
    })
  }

  // Start The game
  deleteGame(battleId: number) {
    this.gameService.deleteGame(battleId).subscribe((response) => {
      if (response?.status == SUCCESS) {
        this.notificationService.showSuccess('Delete The Game');
      } else {
        this.notificationService.showError('Something Went Wrong');
      }
    }, (error) => {
      this.notificationService.showError('Something Went Wrong');
    })
  }

  errorMessageForRunningGame() {
    this.notificationService.showError('Please Complete The Running Game!');
  }

  // redirect to battle page
  public redirectToCodePage(battleId: number) {
    this.router.navigate([`/home/show-game-code/${battleId}`]);
  }

  getPageNotification() {
    this.walletService.getPageNotification().subscribe((response) => {
      if(response?.status == SUCCESS) {
        this.notificationDetails = response?.payload?.data?.find((ele: any) => ele.page == 'GameHome');
        console.log('this.notificationDetails', this.notificationDetails)
      }
    })
  }
}
