// import { NgModule } from '@angular/core';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardGuard } from './auth-guard/auth-guard.guard';
import { FogotpasswordComptComponent } from './components/authentication/fogotpassword-compt/fogotpassword-compt.component';
import { ForgetPasswordComponent } from './components/authentication/forget-password/forget-password.component';
import { LoginCompComponent } from './components/authentication/login-comp/login-comp.component';
import { RegisterCompComponent } from './components/authentication/register-comp/register-comp.component';
import { SignupSigninComponent } from './components/authentication/signup-signin/signup-signin.component';
import { TrackAllComponent } from './components/common-components/track-all/track-all.component';
import { CommonHomeComponent } from './components/common-home/common-home/common-home.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { AboutusComponent } from './components/footers/aboutus/aboutus.component';
import { PrivacypolicyComponent } from './components/footers/privacypolicy/privacypolicy.component';
import { RefundpolicyComponent } from './components/footers/refundpolicy/refundpolicy.component';
import { TermsandconditionsComponent } from './components/footers/termsandconditions/termsandconditions.component';
import { GHomeCompComponent } from './components/goFounders/g-home-comp/g-home-comp.component';
import { GHomeShowallCompComponent } from './components/goFounders/g-home-showall-comp/g-home-showall-comp.component';
import { LoginHomeViewmoreComponent } from './components/Guest/login-home-viewmore/login-home-viewmore.component';
import { LoginHomeComponent } from './components/Guest/login-home/login-home.component';
import { PageNotFoundComponent } from './components/wildCard/page-not-found/page-not-found.component';
import { ContactusComponent } from './contactus/contactus.component';
import { DomainSettingComponent } from './domain-setting/domain-setting.component';

const routes: Routes = [
  { path: '', component: CommonHomeComponent },
  { path: 'aboutus', component: AboutusComponent },
  { path: 'privacypolicy', component: PrivacypolicyComponent },
  {path : 'contactus' , component : ContactusComponent},
  // { path: 'refundpolicy', component: RefundpolicyComponent },
  { path: 'termsandconditions', component: TermsandconditionsComponent },
  {path: 'login' ,component : SignupSigninComponent},
  // LoginCompComponent
  {path:'signup' , component : RegisterCompComponent}, 
  {path :'register' , component : SignupSigninComponent},
  {path: 'forgotpassword' , component: FogotpasswordComptComponent},
 
  {
    path: 'users', canActivate: [AuthGuardGuard], children: [
      {path: '', component: LoginHomeComponent},
      { path: 'showAll/:pageno', component: LoginHomeComponent },
    ]
  },   
  // {
  //   path: 'users', canActivate: [AuthGuardGuard], children: [
  //     {path: '', component: LoginHomeComponent},
  //     { path: 'showAll/:pageno', component: LoginHomeViewmoreComponent },
  //   ]
  // },   
  // EditProfileComponent
  {path:'editProfile',component:EditProfileComponent, canActivate: [AuthGuardGuard]},
  {path:'domainSetting',component:DomainSettingComponent, canActivate: [AuthGuardGuard]},

  // {
  //   path: 'gofounders', children: [
  //     { path: ':userid', component: GHomeCompComponent },
  //     { path: 'showAll/:userid/:pageno', component: GHomeShowallCompComponent }
  //   ]
  // },

  {
    path: 'gofounders', children: [
      { path: ':userid', component: GHomeCompComponent },
      { path: 'showAll/:userid/:pageno', component: GHomeCompComponent }
    ]
  },



  {
    path: 'trackAll', children: [
      { path: ':userid/:trackurl/:pageno', component: TrackAllComponent }
    ]
  },
  {path:'**', component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
