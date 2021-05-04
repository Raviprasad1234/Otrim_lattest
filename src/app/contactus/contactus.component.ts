import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GofoundersService } from '../services/gofounders/gofounders.service';
// import { endpoints } from 'src/app/constants';
// import { ApiService } from 'src/app/services/api.service';
// import { ContactUsService } from 'src/app/services/contact-us.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css'],
  encapsulation: ViewEncapsulation.Emulated

})
export class ContactusComponent implements OnInit {
  contactUsForm: FormGroup;
  contactData: any;

  maxChars = 500;
  role = '';
  chars = 0;




  constructor(private fb: FormBuilder,
    private service : GofoundersService,
    //  private api:ApiService,
    //  private _ContactUsService: ContactUsService,  
     private router: Router) { 
    {
      this.contactUsForm = this.fb.group({
        firstName: ['', [Validators.required , Validators.minLength(3), Validators.maxLength(20)]  ],
        lastName: ['', [Validators.required , Validators.minLength(3), Validators.maxLength(20)]  ],
        email: ["", [Validators.required, Validators.email, Validators.pattern("^(\.[a-zA-Z]{0,45})+[a-zA-Z0-9._]+@+[a-z-]+\\.[a-z.]{2,6}$")]],
        // phoneNumber: ['', Validators.required],
        phoneNumber: ['', [Validators.required, Validators.pattern("^[0-9]{10,15}$")]],
        message: ['', [Validators.required , Validators.minLength(1), Validators.maxLength(500)] ]
      })
    }
  }



  keyPressNumbers(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }
  // Only Characters
  keyPressCharacters(event) {

    var inp = String.fromCharCode(event.keyCode);

    if (/[a-zA-Z\ s]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  ngOnInit(): void {
    window.scroll(0,0);
  }


  refreshPage(){
    var homeLocationpage = sessionStorage.getItem("homeLoc");
    window.location.href = homeLocationpage;
   }


  submitContactUs() {
    this.role = '';
    // this.contactUsForm.disable();
    console.log(this.contactUsForm.value , "this.contactUsForm.value");
    this.service.getcontactusService((this.contactUsForm.value)).subscribe((result)=>{
        console.log(result , "result ");
        // this.role = '';
        if(result['message'] == 'ok'){
          Swal.fire(result['data'], '', 'success');

        }else{
          Swal.fire(result['data'], '', 'error');
        }

        this.contactUsForm.reset();

        // setTimeout(function(){
        //   window.location.reload();
        // }, 1000)
      
    });
    // getcontactusService
    // this._ContactUsService.SaveContactUs((this.contactUsForm.value)).subscribe(result => {
    //   // this.contactUsForm.reset();
    //    console.log('res',result)
      
    //   this.contactData = result;
      
    //   console.log(this.contactData);
    //   if (this.contactData['status'] == 200 || this.contactData['status'] == 201) {
    //     alert("Thanks for Contacting Us! We will be in touch with you shortly");
    
    //     // this.router.navigate(['../']);
    //   }
    //   // else {
    //   //   alert("Something went wrong");
    //   // }
    // });
    // if(this.contactData.status == 200)
    // {
    // alert("Thanks for Contacting Us! We will be in touch with you shortly");
    // this.router.navigate(['../']);
    // } 

  }
  // email = '';
  // firstName = '';
  // id =0;
  // lastNmae = '';
  // message = '';
  // phoneNumber = 9912137654;
  saveContacUs(){
    // let apiObj ={
    //   email: this.email,
    //   firstName: this.firstName,
    //   id: 1,
    //   lastName: this.lastNmae,
    //   message: this.message,
    //   phoneNumber: this.phoneNumber,
    // }
    // this.api.reusePostAPI(endpoints.POST_CONTACT_US,apiObj).subscribe(
    //   (response)=>{
    //     console.log(response);
    //   }
    // )


  }

  
  

}
