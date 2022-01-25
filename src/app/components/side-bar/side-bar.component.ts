import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Constants } from 'src/app/constants/constants';


@Component({
  selector: 'side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  categoriesData: any;
  url: any;
  dynamicData: any;
  constants = Constants;


  constructor(private _data: DataService) { }

  ngOnInit() {
    this.getAllCategories("categories");
    this.getDynamicContent("dynamic-blog-content");
  }


  /**
   * Fetches all dynamic data from the db
   */
   getDynamicContent(apiEndPoint: string) {
    this._data.getDynamicContent(apiEndPoint).subscribe(res => {
      this.dynamicData = [res];
    }, error => {
      console.log('An unexpected error occurred');
      console.log(error);
    });
  }


  /**
   * Fetches all categories in the db
   */
   getAllCategories(apiEndPoint: string) {
    this._data.getDynamicContent(apiEndPoint).subscribe(res => {
      this.categoriesData = res;
    }, error => {
      console.log('An unexpected error occurred');
      console.log(error);
    });
  }

}
