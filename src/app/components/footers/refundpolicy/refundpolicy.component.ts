import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-refundpolicy',
  templateUrl: './refundpolicy.component.html',
  styleUrls: ['./refundpolicy.component.css']
})
export class RefundpolicyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.scroll(0,0);

  }

  refreshPage(){
    var homeLocationpage = sessionStorage.getItem("homeLoc");
    window.location.href = homeLocationpage;
   }

}
