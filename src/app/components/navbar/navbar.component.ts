import { Component, OnInit } from '@angular/core';
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


  constructor(private _data: DataService) { }

  ngOnInit() {
    this.getDynamicContent();
  }

  /**
   * Fetches all dynamic data from the db
   */
   getDynamicContent() {
    this._data.getDynamicContent("dynamic-blog-content").subscribe(res => {
      this.dynamicData = [res];
    }, error => {
      console.log('An unexpected error occurred');
      console.log(error);
    });
  }
  
}
