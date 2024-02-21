import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { GameHomeComponent } from './game-home/game-home.component';
import { RuleComponent } from './rule/rule.component';
import { KycModalComponent } from './kyc-modal/kyc-modal.component';
import { MatInputModule } from '@angular/material/input';
import { ProfileComponent } from './profile/profile.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { TermsConditionComponent } from './terms-condition/terms-condition.component';
import { RefundCancelattionPolicyComponent } from './refund-cancelattion-policy/refund-cancelattion-policy.component';
import { ResponsibleGamingComponent } from './responsible-gaming/responsible-gaming.component';
import { PlatformCommissionComponent } from './platform-commission/platform-commission.component';
import { WalletComponent } from './wallet/wallet.component';
import { TransitionHistoryComponent } from './transition-history/transition-history.component';
import { AddWalletComponent } from './add-wallet/add-wallet.component';
import { AddWithdrawComponent } from './add-withdraw/add-withdraw.component';
import { ReferEarnComponent } from './refer-earn/refer-earn.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LudoGameNameComponent } from './game-home/ludo-game-name/ludo-game-name.component';
import { ShowGameCodeComponent } from './show-game-code/show-game-code.component';
import { GameHistoryComponent } from './game-history/game-history.component';
import { NotificationComponent } from './notification/notification.component';
import { CancelComponent } from './show-game-code/cancel/cancel.component';
import { IWonComponent } from './show-game-code/i-won/i-won.component';
import { ILooseComponent } from './show-game-code/i-loose/i-loose.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'game-home', component: GameHomeComponent },
  { path: 'rule', component: RuleComponent },
  { path: 'kyc', component: KycModalComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'terms-and-condition', component: TermsConditionComponent },
  { path: 'refund-policy', component: RefundCancelattionPolicyComponent },
  { path: 'responsible-gaming', component: ResponsibleGamingComponent },
  { path: 'platform-commission', component: PlatformCommissionComponent },
  { path: 'wallet', component: WalletComponent },
  { path: 'transition-history', component: TransitionHistoryComponent },
  { path: 'add-wallet', component: AddWalletComponent },
  { path: 'add-withdraw', component: AddWithdrawComponent },
  { path: 'refer-earn', component: ReferEarnComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'show-game-code/:gameTableId', component: ShowGameCodeComponent },
  { path: 'game-history', component: GameHistoryComponent },
  { path: 'notification', component: NotificationComponent }
];
@NgModule({
  declarations: [
    HomeComponent,
    HomePageComponent,
    GameHomeComponent,
    KycModalComponent,
    ProfileComponent,
    AboutUsComponent,
    PrivacyPolicyComponent,
    ContactUsComponent,
    PlatformCommissionComponent,
    TermsConditionComponent,
    RefundCancelattionPolicyComponent,
    ResponsibleGamingComponent,
    WalletComponent,
    TransitionHistoryComponent,
    AddWalletComponent,
    AddWithdrawComponent,
    ReferEarnComponent,
    LudoGameNameComponent,
    ShowGameCodeComponent,
    GameHistoryComponent,
    NotificationComponent,
    CancelComponent,
    IWonComponent,
    ILooseComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class HomeModule { }
