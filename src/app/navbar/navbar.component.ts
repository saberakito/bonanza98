import { Component, OnInit,AfterViewInit  } from '@angular/core';
import { TodoService } from 'src/app/service/todo.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
//import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
declare  var openDiv2:any;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  constructor(private route:ActivatedRoute,private router:Router,private serviceMenu:TodoService) {

 
   }
  public menus:Todo[];
  public login_status_check:any;
  
  sub:any;
  id:any;
  check_url1:any;
  slideConfig = {
    "slidesToShow": 1,  
    "dots": false,  
    "infinite": true ,
    "autoplay":true ,
    "autoplaySpeed":7000,
    mobileFirst: true,
    centerMode: true,
    arrows: false,
    centerPadding: '0.1px',
  };
  height: string = '';
  imageSize:{width:600, height: 300};
  arrowSize: string = '30px';
  showArrows: boolean = false;
  disableSwiping: boolean = false;
  autoPlay: boolean = true;
  autoPlayInterval: number = 7000;
  stopAutoPlayOnSlide: boolean = true;
  debug: boolean = false;
  backgroundSize: string = '100% 100%';
  backgroundPosition: string = 'top center';
  backgroundRepeat: string = 'no-repeat';
  showDots: boolean = false;
  dotColor: string = '#FFF';
  showCaptions: boolean = true;
  captionColor: string = '#FFF';
  captionBackground: string = 'rgba(0, 0, 0, .35)';
  lazyLoad: boolean = true;
  hideOnNoSlides: boolean = false;
  width: string = '100%';
  fullscreen: boolean = false;
  imageObject: Array<object> = [{
      // image: '/assets/images/bg_slide/Slide2.jpg',
      // thumbImage: '/assets/images/bg_slide/Slide2.jpg'
  }, 

  
  // {
  //     image: '/assets/images/content/slide2.jpg',
  //     thumbImage: '/assets/images/content/slide2.jpg',
  //     //title: 'Image with title' //Optional: You can use this key if you want to show title
  // },{
  //     image: '/assets/images/content/slide3.jpg',
  //     thumbImage: '/assets/images/content/slide3.jpg',
  //     //title: 'Image with title' //Optional: You can use this key if you want to show title
  // }
  ];
  imageUrls = [
   // { img: "/assets/images/bg_slide/slide.png" },  
  //  { img: "/assets/images/bg_slide/slide2.jpg" },
  //  { img: "/assets/images/bg_slide/slide3.jpg" },
];
  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.check_url1 = event.url.split("/")[1];
      //  this.showHeader = this.activatedRoute.firstChild.snapshot.data.showHeader !== false;
      }
    });
    
    if(localStorage.getItem("login")=="success"){
      this.login_status_check = '1';
    }
    this.serviceMenu.getMenu().subscribe((response)=>{
      this.menus = response;
    });
    this.getLanguage();

    this.serviceMenu.getSlide().subscribe((response)=>{
      var arraySlide = [];
      for(var i =0; i<response.length;i++){
        arraySlide.push({ img: '/upload/files/'+response[i].adjust_page_image_name+'.'+response[i].adjust_page_image_type+'?v=1.2' });
        //arraySlide.push({ url: '/upload/files/'+response[i].adjust_page_image_name+'.'+response[i].adjust_page_image_type+'?v=1.2' });
      }
      
    this.imageUrls = arraySlide;
  });
  }

  tel:any;
  confirm(){
    this.tel = '1234';
  }
  open(content) {
   // this.modalService.open(content);
  }

  logout(){
    this.serviceMenu.setLoggedIn(false);
    localStorage.setItem("login", 'failed');
    this.router.navigate(['/home']);
    window.location.reload();
  }

  openDiv2(){
    openDiv2();
   }

  languageSet(data){
    var dataLanguage = $(data.currentTarget).children("option:selected").val();
    this.serviceMenu.setLanguage(dataLanguage);
    window.location.reload();
  }
  language:any ="TH";
  getLanguage(){
    this.language = this.serviceMenu.isLanguage();
  }

  
}

interface Todo{
  menu_id:number;
  menu_name:string;
  menu_detail:string;
  menu_route:string;
  menu_type:string;
  menu_sort:string;
}
