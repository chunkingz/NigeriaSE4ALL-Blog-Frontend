import { Component, OnInit } from '@angular/core';
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

  constructor(private _data: DataService) { }

  ngOnInit() {
    this.getDynamicPPContent();
  }


  /**
   * Fetches all dynamic data from the db
   */
   getDynamicPPContent() {
    this._data.getDynamicPPContent().subscribe(res => {
      this.dynamicData = [res];
    }, error => {
      console.log('An unexpected error occurred');
      console.log(error);
    });
  }

}
