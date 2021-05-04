import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-termsandconditions',
  templateUrl: './termsandconditions.component.html',
  styleUrls: ['./termsandconditions.component.css']
})
export class TermsandconditionsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.scroll(0,0);

  }

  refreshPage(){
    var homeLocationpage = sessionStorage.getItem("homeLoc");
    window.location.href = homeLocationpage;
   }

}
