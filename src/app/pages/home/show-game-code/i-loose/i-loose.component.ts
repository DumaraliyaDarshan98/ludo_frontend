import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SUCCESS } from 'src/app/pages/constant/response-status.const';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ShowGameCodeService } from 'src/app/services/show-game-code/show-game-code.service';

@Component({
  selector: 'app-i-loose',
  templateUrl: './i-loose.component.html',
  styleUrls: ['./i-loose.component.css']
})
export class ILooseComponent implements OnInit {

  id: any;

  constructor(
    private activeModal: NgbActiveModal,
    private showgameservice: ShowGameCodeService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit() {
    this.id = localStorage.getItem("id")
  }

  submitForm() {
    const data = new FormData();
    data.append('game_table_id', this.id || '');
    this.showgameservice.loosegame(data).subscribe((response) => {
      if (response?.status == SUCCESS) {

        this.notificationService.showSuccess('Submit successfully !');
      } else {
        this.notificationService.showError(response?.message);

      }
    }, (error) => {
      this.notificationService.showError(error?.message);
    });
    this.closePopUp();
  }

  closePopUp(result?: any) {
    this.activeModal.close(result);
  }
}
