import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PrivacyPolicyConstants } from 'src/app/constants/privacy-policy-constants';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {

  dynamicData: any;
  constants = PrivacyPolicyConstants;

  constructor(private _data: DataService, private _title: Title) { }

  ngOnInit() {
    this._title.setTitle('Nigeria-SE4ALL | Privacy Policy');
    this.getDynamicContent("dynamic-privacy-policy-content");
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
