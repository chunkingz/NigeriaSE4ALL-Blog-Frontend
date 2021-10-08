import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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
