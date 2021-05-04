// import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login/login-service.service';
import { ForgetPasswordComponent } from '../../authentication/forget-password/forget-password.component';
import { LoginCompComponent } from '../../authentication/login-comp/login-comp.component';
import { RegisterCompComponent } from '../../authentication/register-comp/register-comp.component';
import { from } from 'rxjs';

declare var $: any;

interface rsp {
  message: string,
  data: any;
}
@Component({
  selector: 'app-common-header',
  templateUrl: './common-header.component.html',
  styleUrls: ['./common-header.component.css']
})
export class CommonHeaderComponent implements OnInit {

  lgf_title = ''

  componentRef: any;
  @Input() userid:string = ''
  @Input() usertype:string = ''
  @ViewChild('lrfComponent', { read: ViewContainerRef }) lrfComponent: ViewContainerRef;

  constructor(private lservice: LoginServiceService, private resolver: ComponentFactoryResolver,
     private route: ActivatedRoute, private router: Router,) { }

  ngOnInit(): void {
    sessionStorage.setItem("homeLoc", window.location.href);
  }

  refreshPage(){
    window.location.reload()
  }
  editProfile(){
      this.router.navigate(['editProfile'])
  }
  gotoDomainSetting(){
    this.router.navigate(['domainSetting'])
  }
  logout(){
    this.lservice.logOut()
  }

  destroyComponent() {
    if (this.componentRef) {
      this.componentRef.destroy()
    }
  }

  createComponent(inp_component) {
    this.destroyComponent()
    this.lrfComponent.clear();
    const factory = this.resolver.resolveComponentFactory(inp_component)
    this.componentRef = this.lrfComponent.createComponent(factory)
    // this.componentRef.instance.forgetPassword = this.outputForgFunc
    var _this = this
    this.componentRef.instance.outputEmit.subscribe(inp => {
      if(inp['message'] == 'register_successful'){
        this.lgf_title = 'Guest Login'
        _this.createComponent(LoginCompComponent)
      }
      if(inp['message'] == 'login_successful'){
        _this.redirectHome(inp['data'])
      }
      if(inp['message'] == 'forget_password'){
        this.lgf_title = 'Forgot Password'
        _this.createComponent(ForgetPasswordComponent)
      }
      if(inp['message'] == 'forget_pass_success'){
        this.lgf_title = 'Guest Login'
        _this.createComponent(LoginCompComponent)
      }
    });
  }

  openLGFComp(inp) {
    if (inp == 'l') {
      this.lgf_title = 'Login'
      this.createComponent(LoginCompComponent)
      $('#lgfModal').modal('show')
    } else if (inp == 'g') {
      this.lgf_title = 'Signup'
      this.createComponent(RegisterCompComponent)
      $('#lgfModal').modal('show')
    }
  }

  redirectHome(data){
    console.log(data, '---------------')
    sessionStorage['token'] = data['token']
    sessionStorage['username'] = btoa(data['userName'])
    this.router.navigate(['users']).then(() => {
      window.location.reload();
    })
  }

  closeLGFComp() {
    this.componentRef.destroy()
    $('#lgfModal').modal('hide')
  }


  openLoginMethod(){
    localStorage.setItem('openmodal','signin')

        this.router.navigateByUrl('/register');
  }


  // openSignupMethod(){
  //   this.router.navigateByUrl('/signup');
  // }

  openSignupMethod(){
    localStorage.setItem('openmodal','signup')
    this.router.navigateByUrl('/register');
  }



}
