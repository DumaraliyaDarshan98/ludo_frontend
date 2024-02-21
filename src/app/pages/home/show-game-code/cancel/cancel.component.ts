import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cancel',
  templateUrl: './cancel.component.html',
  styleUrls: ['./cancel.component.css']
})
export class CancelComponent implements OnInit {

  constructor(
    private activeModal: NgbActiveModal,
  ) { }

  ngOnInit() {
  }

  submit() {
    this.closePopUp();
  }

  typewise(event:any) {

  }

  closePopUp(result?: any) {
    this.activeModal.close(result);
  }

}
