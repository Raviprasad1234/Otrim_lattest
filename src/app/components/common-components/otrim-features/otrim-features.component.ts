import { AfterViewInit, Component, OnInit } from '@angular/core';

declare var jQuery: any;

declare var $ : any;

@Component({
  selector: 'app-otrim-features',
  templateUrl: './otrim-features.component.html',
  styleUrls: ['./otrim-features.component.css']
})
export class OtrimFeaturesComponent implements OnInit, AfterViewInit {

  Path_4_Text: boolean;
  Path_5_Text: boolean;
  Path_6_Text: boolean;
  Path_7_Text: boolean;
  Path_8_Text: boolean;
  Path_9_Text: boolean;
  Path_10_Text: boolean;
  Path_11_Text: boolean;
  Path_12_Text: boolean;
  Path_13_Text: boolean;
  Path_14_Text: boolean;
  
  constructor() {
     this.Path_4_Text = false;
     this.Path_5_Text = false;
     this.Path_6_Text = false;
     this.Path_7_Text = false;
     this.Path_8_Text = false;
     this.Path_9_Text = false;
     this.Path_10_Text = false;
     this.Path_11_Text = false;
     this.Path_12_Text = false;
     this.Path_13_Text = false;
     this.Path_14_Text = false;

  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {

    // jQuery('.feature_link_1').hover(function () {
    //   jQuery('.discription_1').toggleClass('hide');
    // });
    // jQuery('.feature_link_2').hover(function () {
    //   jQuery('.discription_2').toggleClass('hide');
    // });
    // jQuery('.feature_link_3').hover(function () {
    //   jQuery('.discription_3').toggleClass('hide');
    // });
    // jQuery('.feature_link_4').hover(function () {
    //   jQuery('.discription_4').toggleClass('hide');
    // });
    // jQuery('.feature_link_5').hover(function () {
    //   jQuery('.discription_5').toggleClass('hide');
    // });
    // jQuery('.feature_link_6').hover(function () {
    //   jQuery('.discription_6').toggleClass('hide');
    // });
    // jQuery('.feature_link_7').hover(function () {
    //   jQuery('.discription_7').toggleClass('hide');
    // });
    // jQuery('.feature_link_8').hover(function () {
    //   jQuery('.discription_8').toggleClass('hide');
    // });
    // jQuery('.feature_link_9').hover(function () {
    //   jQuery('.discription_9').toggleClass('hide');
    // });
    // jQuery('.feature_link_10').hover(function () {
    //   jQuery('.discription_10').toggleClass('hide');
    // });



    // check img 

    $("#Path_4, #Path_15, #Path_16, #Path_17, #Path_18, #Path_19").hover(function(){
      $(".box-1").toggleClass("hide")
    });

    $("#Path_5, #Path_9514, #Path_9515, #Path_9516, #Path_9517, #Path_9518, #Path_9519, #Path_9520, #Path_9521").hover(function(){
      $(".box-2").toggleClass("hide")
    });
    $("#Path_6, #Path_23, #Path_24, #Path_25").hover(function(){
      $(".box-3").toggleClass("hide")
    });

    $("#Path_7, #Path_528, #Rectangle_603, #Rectangle_604, #Rectangle_605, #Rectangle_606, #Path_529, #Path_530, #Path_531, #Path_528, #Group_970, #Group_971, #Group_972, #Group_973 #Group_974, #Group_975, #Group_976, #Group_977, #Group_978, #Group_979,  #Group_980, #Group_981, #Group_983, #Group_982, #Group_984, #Group_985, #Group_986, #Group_987, #Group_988, #Group_989, #Group_990, #Group_991, #Group_992").hover(function(){
      $(".box-4").toggleClass("hide")
    });

    $("#Path_8, #Path_9500, #Path_9501, #Rectangle_3106, #Group_11865, #Group_11838, #Group_11833, #Group_11834, #Rectangle_3081, #Rectangle_3082, #Group_11835, #Rectangle_3083, #Group_11836, #Rectangle_3084, #Group_11837, #Rectangle_3085, #Group_11844, #Group_11839, #Rectangle_3086, #Group_11840, #Rectangle_3087, #Group_11841, #Rectangle_3088, #Group_11842, #Rectangle_3089, #Group_11843, #Rectangle_3090, #Group_11849, #Group_11845, #Rectangle_3091, #Group_11846, #Rectangle_3092, #Group_11847, #Rectangle_3093, #Group_11848, #Rectangle_3094, #Group_11854, #Group_11850, #Rectangle_3095, #Group_11851, #Rectangle_3096, #Group_11852, #Rectangle_3095 #Rectangle_3096 #Rectangle_3097, #Group_11853, #Rectangle_3098, #Group_11858, #Group_11855, #Rectangle_3099, #Group_11856, #Rectangle_3100, #Group_11857, #Rectangle_3101, #Group_11861, #Group_11859, #Rectangle_3102, #Group_11860, #Rectangle_3103, #Group_11864, #Group_11862, #Rectangle_3104, #Group_11863, #Rectangle_3105, #Rectangle_3107 #Rectangle_3106 #Rectangle_3109 #Rectangle_3108, #Rectangle_3110 #Rectangle_3110, #Path_9502, #Rectangle_3105, #Rectangle_3104, #Rectangle_3110, #Rectangle_3085, #Rectangle_3105, #Rectangle_3109, #Rectangle_3087, #Rectangle_3083, #Rectangle_3108, #Rectangle_3095, #Rectangle_3096, #Rectangle_3097, #Rectangle_3098, #Rectangle_3107, #Rectangle_3082").hover(function(){
      $(".box-5").toggleClass("hide")
    });
    $("#Path_9, #Path_37, #Path_38, #Path_39").hover(function(){
      $(".box-6").toggleClass("hide")
    });
    $("#Path_10, #Path_41, #Path_42, #Path_43, #Path_44, #Path_45, #Path_46, #Path_47, #Path_48").hover(function(){
      $(".box-7").toggleClass("hide")
    });
    $("#Path_11, #Path_50, #Path_52, #Path_53, #Path_54, #Path_55, #Path_56, #Ellipse_3, #Ellipse_4, #Ellipse_5, #Group_18, #Group_19, #Group_20, #Group_21, #Group_22, #Group_23, #Group_24, #Group_25, #Group_26, #Group_27, #Group_28, #Group_29, #Group_30, #Group_31, #Group_32, #Group_33, #Group_34, #Group_35, #Group_36, #Group_37, #Group_38, #Group_39").hover(function(){
      $(".box-8").toggleClass("hide")
    });

    $("#Path_12,  #Shape, #Shape-1, #Shape-2, #Shape-3, #Shape-4, #Shape-5, #Shape-6, #Shape-7, #Shape-7, #Shape-8, #Oval, #Oval-1, #Oval-2, #Oval-3").hover(function(){
      $(".box-9").toggleClass("hide")
    });$("#Path_13, #Path_9511, #Line_111, #Line_112, #Line_113, #Rectangle_3112, #Line_114, #Line_115, #Line_116, #Line_116, #Line_117, #Line_118, #Line_119, #Line_120,  #Path_9512, #Line_121, #Line_122, #Line_123, #Ellipse_231 ").hover(function(){
      $(".box-10").toggleClass("hide")
    });






    // end check img responsive

  }

}
