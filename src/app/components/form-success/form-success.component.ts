import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Constants } from 'src/app/constants/constants';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'form-success',
  templateUrl: './form-success.component.html',
  styleUrls: ['./form-success.component.scss']
})
export class FormSuccessComponent implements OnInit {

  dynamicData: any;
  staticContent!: Constants;
  constants = Constants;

  constructor(private _title: Title, private _data: DataService) { }

  ngOnInit() {
    this._title.setTitle('Form Success');
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
