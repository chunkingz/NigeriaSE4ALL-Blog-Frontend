import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Constants } from 'src/app/constants/constants';
import { DataService } from 'src/app/services/data.service';
import { navbarAnimation } from '../animation/animation';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [ navbarAnimation ]
})
export class NavbarComponent implements OnInit {

  dynamicData: any;
  constants = Constants;
  isCollapsed = true;
  currentRoute = '';
  minigrids = false;
  powersector = false;
  shs = false;
  fmpLogo: any;

  constructor(private _data: DataService, private _router: Router) { }

  ngOnInit() {
    this.getDynamicContent();
    this.getCurrentRoute();
    this.getFMPLogo();
  }

  /**
   * Get the current route to style the navbar bottom border
   */
  getCurrentRoute() {
    this._router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        this.currentRoute = event.url
        this.currentRoute == '/mini-grids' ? this.minigrids = true : this.minigrids = false;
        this.currentRoute == '/power-sector' ? this.powersector = true : this.powersector = false;
        this.currentRoute == '/solar-home-systems' ? this.shs = true : this.shs = false;
      }      
    })
  }

  /**
   * Fetches all dynamic data from the db
   */
   getDynamicContent() {
    this._data.getDynamicContent("dynamic-blog-content").subscribe(res => {
      this.dynamicData = [res];
    }, error => {
      console.log('An unexpected error occurred');
      console.log(error.message);
    });
  }

  getFMPLogo(){
    if (window.innerWidth < 425) {
      return this.fmpLogo = 'assets/fmp_logo_no_text.png';
    }
    else{
      return this.fmpLogo = 'assets/logo-2-crest.png';
    }
  }

  toggleOffBurgerMenu(){
    this.isCollapsed = true;
  }
  
}
