import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Route } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SUCCESS } from 'src/app/pages/constant/response-status.const';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ShowGameCodeService } from 'src/app/services/show-game-code/show-game-code.service';

@Component({
  selector: 'app-i-won',
  templateUrl: './i-won.component.html',
  styleUrls: ['./i-won.component.css']
})
export class IWonComponent implements OnInit {

  imageToUpload: any;
  id: any;
  imageSrc!: any;
  
  constructor(
    private activeModal: NgbActiveModal,
    private showgameservice: ShowGameCodeService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit() {
    this.id = localStorage.getItem("id")
  }

  addWonForm = {
    image: new FormControl(""),
  };

  wonForm = new FormGroup(this.addWonForm, []);

  submitForm() {
    const data = new FormData();
    data.append('file', this.imageToUpload);
    data.append('game_table_id', this.id || '');
    this.showgameservice.wingame(data).subscribe((response) => {
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

  addFiles(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.imageToUpload = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageSrc = reader.result
      };
      reader.readAsDataURL(file);
    }
  }

  
  handleFile(file: File) {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageSrc = reader.result;
        console.log(this.imageSrc);
        this.imageToUpload = file;
      };
      reader.readAsDataURL(file);
    }
  }

}
