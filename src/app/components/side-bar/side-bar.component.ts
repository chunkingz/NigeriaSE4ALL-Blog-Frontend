import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  categoriesData: any;


  constructor(private _data: DataService) { }

  ngOnInit() {
    this.getAllCategories();
  }


  /**
   * Fetches all categories in the db
   */
   getAllCategories() {
    this._data.getCategories().subscribe(res2 => {
      // console.log(res2);
      this.categoriesData = res2;
    }, error => {
      console.log('An unexpected error occurred');
      console.log(error);
    });
  }

}
