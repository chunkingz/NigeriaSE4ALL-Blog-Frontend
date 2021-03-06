import { Component, OnInit } from '@angular/core';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { Constants } from 'src/app/constants/constants';
import { DataService } from 'src/app/services/data.service';
import { footerAnimation } from '../animation/animation';


@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  animations: [ footerAnimation ]
})
export class FooterComponent implements OnInit {

  faArrowUp = faArrowUp;
  dynamicData: any;
  constants = Constants;

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
      console.log(error.message);
    });
  }
  
}
