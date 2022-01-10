import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Constants } from 'src/app/constants/constants';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent implements OnInit {

  dynamicData: any;
  staticContent!: Constants;
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
  
  formSubmit(email: any) {
    const validatedEmail = this.validateEmail(email.value)
    if (!validatedEmail) {
      this.formErrorNotification();
    } else {
      this.formSubmissionNotification();
    }

  }


  formSubmissionNotification() {
    Swal.fire('🥳🎉', 'Thank you for subscribing, we will surely keep you updated!', 'success')
  }


  formErrorNotification() {
    Swal.fire('😒', 'Kindly fill in a valid email address', 'error')
  }

  validateEmail(email: any) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}
