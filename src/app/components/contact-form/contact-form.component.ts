import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import emailjs from '@emailjs/browser';
import { Constants } from 'src/app/constants/constants';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  dynamicData: any;
  constants = Constants;

  constructor(private _title: Title, private _router: Router, private _data: DataService) { }

  ngOnInit() {
    this._title.setTitle('Contact Us');
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

  // formSubmit(formValues: any) {
  //   if (formValues.value.email == '' || formValues.value.username == '' || formValues.value.question == '') {
  //     console.log('form is invalid');
  //     this.formErrorNotification();
  //   } else {
  //     console.log(formValues.value);
  //     this.formSubmissionNotification();
  //     this._router.navigate(['form-success']);
  //   }

  // }



/**
 * Function to send the form values as an email.
 * @param {Event} e - the form event 
 * @param {any} formValues - the form data 
 */
  public sendEmail(e: Event, formValues: any) {
    if (formValues.value.email == '' || formValues.value.username == '' || formValues.value.question == '') {
      // console.log('form is invalid');
      this.formErrorNotification();
    } else {
      // console.log(formValues.value);

      // https://www.npmjs.com/package/@emailjs/browser
      // 
      // emailjs.sendForm('se4all', 'blog-contact-form', e.target as HTMLFormElement, 'user_j1gyGaPSg0i5lXKJapPHZ')
      //   .then((response) => {
      //     console.log('SUCCESS!', response.status, response.text);
      //   }, (error) => {
      //     console.log('FAILED...', error);
      //   });

      this.formSubmissionNotification();
      this._router.navigate(['form-success']);

    }
  }

  formSubmissionNotification() {
    Swal.fire('🥳🎉', 'Thank you for filling out the form, we will get back to you shortly!', 'success')
  }


  formErrorNotification() {
    Swal.fire('😒', 'Kindly fill out the form completely', 'error')
  }



}
