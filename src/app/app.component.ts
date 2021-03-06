import { Component,ViewChild } from '@angular/core';

import { AuthService } from './service/auth.service';
import { Router,NavigationEnd } from '@angular/router';
import { NgImageSliderComponent } from 'ng-image-slider';
import { CookieService } from 'ngx-cookie-service';
import { TodoService } from 'src/app/service/todo.service';
import { ActivatedRoute } from "@angular/router";

//import { ButtonComponent, RadioButtonComponent } from "@syncfusion/ej2-angular-buttons";


import * as AOS from 'aos';
import * as $ from 'jquery';
declare  var closeDiv2,closeDiv,openDiv,openDiv2,openWithDraw,openDeposit,closeDeposit,closeWithdraw:  any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'casino';
  constructor(private route: ActivatedRoute,private todoServcie:TodoService,private _authService:AuthService, private _router:Router, private cookie:CookieService,private router:Router){}
  @ViewChild('nav') slider: NgImageSliderComponent;
  public close_popup = "0";
  public adjust_page_image_name:string;
  public adjust_page_image_type:string;
  public website_title:string;
  imageObject: Array<object> = [{
      image: '/assets/images/content/slide1.jpg',
      thumbImage: '/assets/images/content/slide2.jpg'
  }, {
      image: '/assets/images/content/slide2.jpg',
      thumbImage: '/assets/images/content/slide1.jpg',
      //title: 'Image with title' //Optional: You can use this key if you want to show title
  },{
      image: '/assets/images/content/slide3.jpg',
      thumbImage: '/assets/images/content/slide3.jpg',
      //title: 'Image with title' //Optional: You can use this key if you want to show title
  }
  ];
  prevImageClick() {
      this.slider.prev();
  }

  nextImageClick() {
      this.slider.next();
  }

  closePopup() {
    this.cookie.set("close_popup", "1",1);
    this.close_popup = '1';
  }
 
  
  openDiv(){
   openDiv();
  }


  openDiv2(){
    openDiv2();
   }

   openWithDraw(){
    openWithDraw();
   }

   
   openDeposit(){
    openDeposit();
   }
 
 
  language:any;
  getLanguage(){
    this.language = this.todoServcie.isLanguage();
  }

  public class_checkShow:string;
  showHeader = true;
  check_url1:any;
  menu_hide:any;
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
        let date = params['menu'];
        console.log(date); // Print the parameter to the console. 
    });
    this.getLanguage();
    // this.route.paramMap.subscribe(params => {
    //   this.menu_hide = params.get("menu");
    //   debugger;
    //   if(this.menu_hide=='hide'){
    //     this.showHeader = false;
    //    // this.class_checkShow = "content_100";
    //   }else{
    //     this.showHeader = true;
    //    // this.class_checkShow = "container bg_content";
    //   // this.class_checkShow = "container bg_content";
    //   }
    // })
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        var check_url = event.url.split("/")[2];
        this.check_url1 = event.url.split("/")[1];
        if(check_url=='register'||check_url=='deposit'||(check_url=='withdraw'&&this.check_url1!='affm')){
          this.showHeader = true;
         // this.class_checkShow = "content_100";
        }else{
          this.showHeader = true;
         // this.class_checkShow = "container bg_content";
        // this.class_checkShow = "container bg_content";
        }
        
      //  this.showHeader = this.activatedRoute.firstChild.snapshot.data.showHeader !== false;
      }
    });

    this.todoServcie.getSetting().subscribe((response)=>{
      // this.website_title = response.data.website_title;
      // $('title').html(this.website_title);
    });
   
    AOS.init();
    // this.todoServcie.getPopup().subscribe((response)=>{
    //  this.adjust_page_image_name = response.adjust_page_image_name;
    //  this.adjust_page_image_type = response.adjust_page_image_type
    //  if(this.adjust_page_image_name==''||this.adjust_page_image_name==null){
    //   this.close_popup = '1';
    //  }
    // });
    var close_popup_value =  this.cookie.get("close_popup");
    if(close_popup_value=='1'){
      this.close_popup = '1';
    }
    document.body.classList.add('bg-img');
    if(localStorage.getItem('web_status')=='2'){
      this._router.navigate(['/404']);
      return false;
    }
      
  }
  tel:any;
  otp:any;
  password:any;
  bank_acc:any;

  confirmRegis(){
    var tel = $('.input_regis_m').val();
    this.todoServcie.savePhone(tel).subscribe((response)=>{
      if(response.success==true&&response['step']=='1'){
        this.tel = tel;
      }else if(response.success==true&&response['step']=='2'){
        this.tel = tel;
      }else if(response.success==true){
        this.tel = tel;
      }
      
    });
    
  }

  confirmOTP(){
    var otp = $('[name="opt_text"]').val();
    
    this.todoServcie.checkOTP(this.tel,otp).subscribe((response)=>{
      if(response.success==true){
        this.otp = otp;
      }
      
    });
  }

  confirmPassword(){
    this.password = '123';
    //this.tel = null;
   // this.otp = null;
    //closeDiv();
  }

  confirmBank(){
    this.bank_acc = '123';
    this.tel = null;
    this.otp = null;
    this.password = null
    closeDiv();
  }

  user:any;
  login_fnc(){
    this.user = 'testUser';
    closeDiv2();
  }

  doposit_fnc(){
    closeDeposit();
  }

  withdraw_fnc(){
    closeWithdraw();
  }

  withdraw_cancel_fnc(){
    closeWithdraw();
  }

  rt:any;
  openQr(){
    this.rt = ($(window).width() - ($(".qr_div").offset().left + $(".qr_div").outerWidth()));
    if(this.rt=='-202'){
      $('.qr_div').animate({'right':0})
      $('.qr_div').removeClass('animate__slideOutRight');
      $('.qr_div').addClass('animate__slideInRight');
     
    }else{
      $('.qr_div').animate({'right':'-202px'})
      $('.qr_div').removeClass('animate__slideInRight');
      $('.qr_div').addClass('animate__slideOutRight');
    
    }
    
  }
}

