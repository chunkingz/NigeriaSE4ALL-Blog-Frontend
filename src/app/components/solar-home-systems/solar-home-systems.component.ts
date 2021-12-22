import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/constants/constants';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-solar-home-systems',
  templateUrl: './solar-home-systems.component.html',
  styleUrls: ['./solar-home-systems.component.scss', '../home/home.component.scss']
})
export class SolarHomeSystemsComponent implements OnInit {

  dynamicData: any;
  staticContent!: Constants;

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
