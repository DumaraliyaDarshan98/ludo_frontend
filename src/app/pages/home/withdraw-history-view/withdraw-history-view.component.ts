import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from 'src/app/services/game-service/game.service';
import { SUCCESS } from '../../constant/response-status.const';

@Component({
  selector: 'app-withdraw-history-view',
  templateUrl: './withdraw-history-view.component.html',
  styleUrls: ['./withdraw-history-view.component.scss']
})
export class WithdrawHistoryViewComponent {

  withdrawDetials: any = [];
  withdrawID : any

  ngOnInit(): void {
    this.getwithdrawDetails();
  }

  constructor(
    private gameService: GameService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.route.paramMap.subscribe(params => {
      this.withdrawID = params.get('id'); // Get the id parameter
      console.log(' this.withdrawID', this.withdrawID)
    });
  }

  getwithdrawDetails() {
    console.log(this.withdrawID);
    
    this.withdrawDetials = [];
    this.gameService.getWithdrawDetialsView(this.withdrawID).subscribe((response) => {
      if (response?.status == SUCCESS) {
        this.withdrawDetials = response?.payload?.data;
        console.log(this.withdrawDetials);
        
      } else {
        this.withdrawDetials = [];
      }
    }, (error:any) => {
      this.withdrawDetials = [];
    });
  }


}
