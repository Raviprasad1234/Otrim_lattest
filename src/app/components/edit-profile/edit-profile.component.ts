import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginServiceService } from 'src/app/services/login/login-service.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private service:LoginServiceService) { }
  editProfile:FormGroup;
  userid: string = '';
  dec_userid: string = '';
  submitted = false;
  showfiletypeError=false;
  ngOnInit(){ 

    if (sessionStorage['username']) {
      this.userid = sessionStorage['username']
      this.dec_userid = atob(this.userid)
    }
 


    this.editProfile = this.formBuilder.group({
      image: ['', [Validators.required]],
      firstname: ['', [Validators.required,Validators.minLength(3),Validators.maxLength(25)]],
      lastname: ['', [Validators.required,Validators.minLength(3),Validators.maxLength(25)]],
      Country: ['', Validators.required],
      mobile: ['', [Validators.required,]]
      // selectedata: ['', Validators.required]
      
    });
  };
  get f() { return this.editProfile.controls; }
 
  onFileChanged(event) {
    if (event.target.files.length > 0) {

      // jpeg and png 

      // image/png

      if (event.target.files[0].type == "image/png" || event.target.files[0].type == "image/jpeg" || event.target.files[0].type == "image/gif") {
        const file = event.target.files[0]['name'].split(' ').join('');
        this.showfiletypeError = false;
        console.log(file,'dddddddddddddd')
        this.editProfile.patchValue({
          image: file
        });
      } else {
        this.showfiletypeError = true;
        return;
      }
    }else{
      this.submitted=true
    }
  }
  submit(){
    this.submitted = true;

    if(this.editProfile.valid){
     console.log(this.editProfile.controls.firstname.value,'send');
        var obj={
            "firstname"    :this.editProfile.controls.firstname.value,
            "lastname"     :this.editProfile.controls.lastname.value,
            "location"     :this.editProfile.controls.Country.value,
            "mobilenumber" :this.editProfile.controls.mobile.value,
            "imageFile"    :this.editProfile.controls.image.value
        };
        this.service.updateProfile(obj).subscribe((dt)=>{
          console.log(dt)
        },(error)=>{
          console.log(error)
        })
    }else{
      console.log('its not a valid data')
      }
  }
}
