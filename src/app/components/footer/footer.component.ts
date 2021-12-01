import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { Constants } from 'src/app/constants/constants';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FooterComponent implements OnInit {

  faArrowUp = faArrowUp;
  dynamicData: any;
  staticContent!: Constants;

  constructor(private _data: DataService) { }

  ngOnInit() {
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
