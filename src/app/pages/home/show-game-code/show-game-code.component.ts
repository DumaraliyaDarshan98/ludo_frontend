import { NotificationService } from './../../../services/notification/notification.service';
import { GameService } from 'src/app/services/game-service/game.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SUCCESS } from '../../constant/response-status.const';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IWonComponent } from './i-won/i-won.component';
import { CancelComponent } from './cancel/cancel.component';
import { ILooseComponent } from './i-loose/i-loose.component';

@Component({
  selector: 'app-show-game-code',
  templateUrl: './show-game-code.component.html',
  styleUrls: ['./show-game-code.component.scss']
})
export class ShowGameCodeComponent implements OnInit {
  battleDetails: any;
  battleId: any;

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private notificationService: NotificationService,
    private router: Router,
    private modalService: NgbModal
  ) {
    this.route.params.subscribe((params: any) => {
      console.log(typeof params['gameTableId'])
      this.battleId = params['gameTableId'];
    })
  }

  ngOnInit(): void {
    this.getBattleDetails();
  }

  getBattleDetails() {
    this.gameService.getBattleById(this.battleId).subscribe((response) => {
      if (response?.status == SUCCESS) {
        this.battleDetails = response?.payload?.data;
        if (this.battleDetails?.is_running == 2) {
          this.router.navigateByUrl('/home/game-home');
        }
        localStorage.setItem("id", this.battleId);
        console.log('this.battleDetails', this.battleDetails);
        this.notificationService.showSuccess('Game Code Found');
      } else {
        this.notificationService.showError('Something went wrong');
      }
    }, (error) => {
      this.notificationService.showError('Something went wrong');
    });
  }

  openWinModal() {
    const modalRef = this.modalService.open(IWonComponent);

    modalRef.result.then((result) => {
      console.log('result : resultresult : ', result)
    })
  }

  openCancelModal() {
    const modalRef = this.modalService.open(CancelComponent);

    modalRef.result.then((result) => {
      console.log('result : resultresult : ', result)
    })
  }

  openLooseModal() {
    const modalRef = this.modalService.open(ILooseComponent);

    modalRef.result.then((result) => {
      console.log('result : resultresult : ', result)
    })
  }
}
