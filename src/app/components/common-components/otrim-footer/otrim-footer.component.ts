
// import { Component, OnInit } from '@angular/core';



import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GofoundersService } from 'src/app/services/gofounders/gofounders.service';

import Swal from 'sweetalert2'


@Component({
  selector: 'app-otrim-footer',
  templateUrl: './otrim-footer.component.html',
  styleUrls: ['./otrim-footer.component.css']
})
export class OtrimFooterComponent implements OnInit {

  constructor(private router : Router ,  private gservice: GofoundersService) { }


  subscribeMail : any = '';


  ngOnInit(): void {
  }


  gotoaboutus(){
    this.router.navigateByUrl('/aboutus')
  }
  gotoprivacypolicy(){
    this.router.navigateByUrl('/privacypolicy')
 
  }
  gototermsAndcondtions(){
    this.router.navigateByUrl('/termsandconditions');
  }

  gotoRefundpolicy(){
    this.router.navigateByUrl('/refundpolicy')
  }


  gotoContactUsPage(){
    this.router.navigateByUrl('/contactus');
  }


  // SaveSubscribeMailMethod(){
  //   var mailAddres =    {  "email":this.subscribeMail};
  //   if(this.subscribeMail == '' || this.subscribeMail == null){
  //     Swal.fire('Please enter an Mail Address !', '', 'error')
  //   } else{

  //     this.gservice.getSubscriptionService(mailAddres).subscribe((response)=>{
  //       console.log(response , "response mail")
  //   }, (error)=>{

  //   });
  //   }
       
  // }

  
  SaveSubscribeMailMethod(){
    var mailAddres =    {  "email":this.subscribeMail};
    if(this.subscribeMail == '' || this.subscribeMail == null){
      Swal.fire('Please enter an Mail Id!', '', 'error')
    } else{

      this.gservice.getSubscriptionService(mailAddres).subscribe((response)=>{
        console.log(response , "response mail");
        Swal.fire(response['message'],'','success');
    }, (error)=>{
      Swal.fire('server Error!', '', 'error');

    });
    }
       
  }



}
