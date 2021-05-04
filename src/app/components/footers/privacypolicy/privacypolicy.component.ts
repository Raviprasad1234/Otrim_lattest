import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-privacypolicy',
  templateUrl: './privacypolicy.component.html',
  styleUrls: ['./privacypolicy.component.css']
})
export class PrivacypolicyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.scroll(0,0);

  }

  refreshPage(){
    var homeLocationpage = sessionStorage.getItem("homeLoc");
    window.location.href = homeLocationpage;
   }

}
