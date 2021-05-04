import { BrowserModule, ɵBROWSER_SANITIZATION_PROVIDERS } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatDatepickerModule } from '@angular/material/datepicker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonHomeComponent } from './components/common-home/common-home/common-home.component';
import { OtrimFeaturesComponent } from './components/common-components/otrim-features/otrim-features.component';
import { OtrimAnalyticsSliderComponent } from './components/common-components/otrim-analytics-slider/otrim-analytics-slider.component';
import { OtrimFooterComponent } from './components/common-components/otrim-footer/otrim-footer.component';
import { OtrimCopyrightComponent } from './components/common-components/otrim-copyright/otrim-copyright.component';
import { LoginCompComponent } from './components/authentication/login-comp/login-comp.component';
import { RegisterCompComponent } from './components/authentication/register-comp/register-comp.component';
import { LoginHomeComponent } from './components/Guest/login-home/login-home.component';
import { LoginHomeViewmoreComponent } from './components/Guest/login-home-viewmore/login-home-viewmore.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './components/wildCard/page-not-found/page-not-found.component';
import { OtrimBannerComponent } from './components/common-components/otrim-banner/otrim-banner.component';
import { GHomeCompComponent } from './components/goFounders/g-home-comp/g-home-comp.component';
import { GHomeShowallCompComponent } from './components/goFounders/g-home-showall-comp/g-home-showall-comp.component';
import { SendUserInfoInterceptor } from './interceptors/send-user-info.interceptor';
import { TrackAllComponent } from './components/common-components/track-all/track-all.component';
import { OtrimUserChartsComponent } from './components/common-components/otrim-user-charts/otrim-user-charts.component';
import { ForgetPasswordComponent } from './components/authentication/forget-password/forget-password.component';
import { CommonHeaderComponent } from './components/common-components/common-header/common-header.component';
import { MatNativeDateModule, MatRippleModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { AboutusComponent } from './components/footers/aboutus/aboutus.component';
import { PrivacypolicyComponent } from './components/footers/privacypolicy/privacypolicy.component';
import { RefundpolicyComponent } from './components/footers/refundpolicy/refundpolicy.component';
import { TermsandconditionsComponent } from './components/footers/termsandconditions/termsandconditions.component';


// import { NgModule } from '@angular/core';

import { QRCodeModule } from 'angularx-qrcode';



import { ContactusComponent } from './contactus/contactus.component';
import { SignupSigninComponent } from './components/authentication/signup-signin/signup-signin.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import {CaptchaModule} from 'primeng/captcha';
import { FogotpasswordComptComponent } from './components/authentication/fogotpassword-compt/fogotpassword-compt.component';
import { PaginationTableComponent } from './components/pagination-table/pagination-table.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { SelectLanguageComponent } from './components/select-language/select-language.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { DomainSettingComponent } from './domain-setting/domain-setting.component';
import {TwoDigitDecimaNumberDirective} from '../app/Validations/onlynumber'




@NgModule({
  declarations: [
    AppComponent,
    CommonHomeComponent,
    OtrimFeaturesComponent,
    OtrimAnalyticsSliderComponent,
    OtrimFooterComponent,
    OtrimCopyrightComponent,
    LoginCompComponent,
    RegisterCompComponent,
    LoginHomeComponent,
    LoginHomeViewmoreComponent,
    GHomeCompComponent,
    GHomeShowallCompComponent,
    PageNotFoundComponent,
    OtrimBannerComponent,
    TrackAllComponent,
    OtrimUserChartsComponent,
    ForgetPasswordComponent,
    CommonHeaderComponent,
    AboutusComponent,
    PrivacypolicyComponent,
    RefundpolicyComponent,
    TermsandconditionsComponent,
    ContactusComponent,
    SignupSigninComponent,
    FogotpasswordComptComponent,
    PaginationTableComponent,
    SelectLanguageComponent,
    EditProfileComponent,
    DomainSettingComponent,
    TwoDigitDecimaNumberDirective
  ],
  imports: [
    BrowserModule,
    CaptchaModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxSpinnerModule,
    AppRoutingModule,  
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule ,
    MatButtonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatNativeDateModule,
    MatRippleModule,
     QRCodeModule
  ],
  providers: [
    ɵBROWSER_SANITIZATION_PROVIDERS,
    {provide: HTTP_INTERCEPTORS, useClass: SendUserInfoInterceptor, multi: true},
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
  entryComponents:[
    LoginCompComponent,
    RegisterCompComponent,
    ForgetPasswordComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
