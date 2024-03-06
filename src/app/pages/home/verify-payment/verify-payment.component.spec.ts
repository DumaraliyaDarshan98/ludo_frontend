import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyPaymentComponent } from './verify-payment.component';

describe('VerifyPaymentComponent', () => {
  let component: VerifyPaymentComponent;
  let fixture: ComponentFixture<VerifyPaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerifyPaymentComponent]
    });
    fixture = TestBed.createComponent(VerifyPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
