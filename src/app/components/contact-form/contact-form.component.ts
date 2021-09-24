import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Component({
  selector: 'contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  constructor(private _title: Title, private _router: Router) { }

  ngOnInit() {
    this._title.setTitle('Contact Us');
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
 * @param {e} Event - the form event 
 * @param {formValues} - the form data 
 */
  public sendEmail(e: Event, formValues: any) {
    if (formValues.value.email == '' || formValues.value.username == '' || formValues.value.question == '') {
      console.log('form is invalid');
      this.formErrorNotification();
    } else {
      console.log(formValues.value);

      emailjs.sendForm('blog-contact-form', 'blog-contact-form', e.target as HTMLFormElement, 'user_j1gyGaPSg0i5lXKJapPHZ')
        .then((result: EmailJSResponseStatus) => {
          console.log(result.text);
        }, (error) => {
          console.log(error.text);
        });

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
