import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/constants/constants';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'mini-grids',
  templateUrl: './mini-grids.component.html',
  styleUrls: ['./mini-grids.component.scss']
})
export class MiniGridsComponent implements OnInit {

  dynamicData: any;
  constants = Constants;

  constructor(private _data: DataService) { }

  ngOnInit(): void {
    this.getDynamicContent();
  }

  /**
   * Fetches all dynamic data from the db
   */
   getDynamicContent() {
    this._data.getDynamicContent().subscribe(res => {
      this.dynamicData = [res];
    }, error => {
      console.log('An unexpected error occurred');
      console.log(error);
    });
  }

}
