import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/constants/constants';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dynamicData: any;
  section3DynamicData: any;
  section4DynamicData: any;
  constants = Constants;

  constructor(private _data: DataService) { }

  ngOnInit(): void {
    this.getHomeDynamicContent("dynamic-blog-content");
    this.getSection3DynamicContent("home-section-3-cards");
    this.getSection4DynamicContent("home-section-4-cards");
  }

  /**
   * Fetches all dynamic data from the db
   */
   getHomeDynamicContent(apiEndPoint: string) {
    this._data.getDynamicContent(apiEndPoint).subscribe(res => {
      this.dynamicData = [res];      
    }, error => {
      console.log('An unexpected error occurred');
      console.log(error);
    });
  }

  /**
   * Fetches Section 3 dynamic data from the db
   */
   getSection3DynamicContent(apiEndPoint: string) {
    this._data.getDynamicContent(apiEndPoint).subscribe(res => {
      this.section3DynamicData = res;      
    }, error => {
      console.log('An unexpected error occurred');
      console.log(error);
    });
  }

  /**
   * Fetches Section 4 dynamic data from the db
   */
   getSection4DynamicContent(apiEndPoint: string) {
    this._data.getDynamicContent(apiEndPoint).subscribe(res => {
      this.section4DynamicData = res;      
    }, error => {
      console.log('An unexpected error occurred');
      console.log(error);
    });
  }


}
