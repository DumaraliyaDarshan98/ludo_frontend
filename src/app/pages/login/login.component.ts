import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { BaseLogin } from '../shared/base-login';
import { SUCCESS } from '../constant/response-status.const';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseLogin implements OnInit {

  defaultLoginForm = {
    userName: new FormControl("", [Validators.required]),
    otp: new FormControl(""),
  };

  loginForm = new FormGroup(this.defaultLoginForm, []);
  loginUser: any;
  showLoader: boolean = false;
  isOTP : boolean = false;

  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private notificationService: NotificationService,
  ) {
    super()
    this.loginUser = this.localStorageService.getLogger();
  }

  ngOnInit(): void {
    if (this.loginUser) {
      // this.router.navigateByUrl('/home');
    }
  }

  // Function to use for the login the user
  login(): void {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      this.showLoader = true;
      this.authService.login(this.loginForm.value).subscribe((response) => {
        if (response?.status == SUCCESS) {
          console.log('response', response?.payload.status);
          this.isOTP = true;
          // this.localStorageService.setLogger(response?.payload);
          // this.showLoader = false;
          // this.router.navigateByUrl('/home');
          this.notificationService.showSuccess(response?.message || 'OTP Send Successfully');
        } else {
          this.showLoader = false;
          this.notificationService.showError(response?.message);
        }
      }, (error) => {
        this.showLoader = false;
        this.notificationService.showError(error?.error?.error?.message || 'Something went wrong!');
      })
    }
  }

  NumberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
  }

  verifyOTP() {
    this.loginForm.markAllAsTouched();
    this.showLoader = true;
    this.authService.verifyOTP(this.loginForm.value).subscribe((response) => {
      if (response?.status == SUCCESS) {
        console.log('response', response?.payload.status);
        this.isOTP = false;
        this.localStorageService.setLogger(response?.payload);
        this.showLoader = false;
        this.router.navigateByUrl('/home');
        this.notificationService.showSuccess(response?.message || 'OTP Verify Successfully');
      } else {
        this.showLoader = false;
        this.notificationService.showError(response?.message);
      }
    }, (error) => {
      this.showLoader = false;
      this.notificationService.showError(error?.error?.error?.message || 'Something went wrong!');
    });
  }

}
