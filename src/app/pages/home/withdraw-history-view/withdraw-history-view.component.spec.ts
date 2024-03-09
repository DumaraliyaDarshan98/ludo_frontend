import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawHistoryViewComponent } from './withdraw-history-view.component';

describe('WithdrawHistoryViewComponent', () => {
  let component: WithdrawHistoryViewComponent;
  let fixture: ComponentFixture<WithdrawHistoryViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WithdrawHistoryViewComponent]
    });
    fixture = TestBed.createComponent(WithdrawHistoryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
