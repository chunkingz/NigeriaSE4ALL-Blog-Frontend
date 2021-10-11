import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  categoriesData: any;
  url: any;

  constructor(private _data: DataService) { }

  ngOnInit() {
    this.getAllCategories();
  }


  /**
   * Fetches all categories in the db
   */
   getAllCategories() {
    this._data.getCategories().subscribe(res => {
      this.categoriesData = res;
    }, error => {
      console.log('An unexpected error occurred');
      console.log(error);
    });
  }

}
