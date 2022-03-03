import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import emailjs from '@emailjs/browser';
import { Constants } from 'src/app/constants/constants';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss']
})
export class NewsletterComponent implements OnInit {

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
    this._data.getDynamicContent("dynamic-blog-content").subscribe(res => {
      this.dynamicData = [res];
    }, error => {
      console.log('An unexpected error occurred');
      console.log(error);
    });
  }
  
/**
 * Function to send the form values as an email.
 * @param {Event} e - the form event 
 * @param {any} email - the form data 
 */
//  sendEmail(e: Event, formData: any) {
//    const {email} = formData.value;
//    const templateParams = {
//      visitorEmail: email
//     };
//     const validatedEmail = this.validateEmail(email)
//     if (!validatedEmail) {
//       this.formErrorNotification();
//     } else {
//       // https://www.npmjs.com/package/@emailjs/browser
//       // 
//       // emailjs.send('se4all', 'subscribe-to-newsletter', templateParams, 'user_j1gyGaPSg0i5lXKJapPHZ')
//       // .then((response) => {
//       //   console.log('SUCCESS!', response.status, response.text);
//       // }, (error) => {
//       //   console.log('FAILED...', error);
//       // });
//       this.formSubmissionNotification();
//     }

//   }


  // formSubmissionNotification() {
  //   Swal.fire('🥳🎉', 'Thank you for subscribing, we will surely keep you updated!', 'success')
  // }


  // formErrorNotification() {
  //   Swal.fire('😒', 'Kindly fill in a valid email address', 'error')
  // }

  // validateEmail(email: any) {
  //   const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   return re.test(String(email).toLowerCase());
  // }
}
