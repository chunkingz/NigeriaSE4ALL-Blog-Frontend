import { Component, OnInit } from '@angular/core';
import { TermsOfServiceConstants } from 'src/app/constants/tos-constants';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'terms-of-service',
  templateUrl: './terms-of-service.component.html',
  styleUrls: ['./terms-of-service.component.scss']
})
export class TermsOfServiceComponent implements OnInit {

  dynamicData: any;
  constants = TermsOfServiceConstants;

  constructor(private _data: DataService) { }

  ngOnInit() {
    this.getDynamicContent("dynamic-tos-content");
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

}
