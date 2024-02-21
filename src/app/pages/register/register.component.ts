import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Patterns } from '../constant/validation-patterns.const';
import { BaseLogin } from '../shared/base-login';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { SUCCESS } from '../constant/response-status.const';
import { CustomValidation } from '../shared/custome-validation';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent extends BaseLogin implements OnInit {

  defaultSignUpForm = {
    full_name: new FormControl("", [Validators.required, Validators.pattern(Patterns.name)]),
    mobile_no: new FormControl("", [Validators.required, Validators.pattern(Patterns.mobile)]),
    email: new FormControl("", [Validators.required, Validators.pattern(Patterns.email)]),
    password: new FormControl("", [Validators.required]),
    code: new FormControl(""),
  };

  signUpForm = new FormGroup(this.defaultSignUpForm, [
    // CustomValidation.MatchValidator('password', 'confirm_password'),
  ]);

  showLoader: boolean = false;

  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private notificationService: NotificationService,
    // public customValidation: CustomValidation
  ) {
    super()
  }

  ngOnInit() {
  }

  NumberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  submitForm() {
    this.signUpForm.markAllAsTouched();
    if (this.signUpForm.valid) {
      this.showLoader = true;
      this.authService.registerUser(this.signUpForm.value).subscribe((result) => {
        if (result?.status == SUCCESS) {
          this.router.navigateByUrl('/');
          this.showLoader = false;
          this.notificationService.showSuccess(result?.message || 'User successfully register')
        } else {
          this.notificationService.showError(result?.message);
          this.showLoader = false;
        }
      }, (error) => {
        this.notificationService.showError(error?.error?.error?.message || 'Something went wrong!');
        this.showLoader = false;
      });
    }
  }

}
