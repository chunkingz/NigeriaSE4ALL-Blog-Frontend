import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'form-success',
  templateUrl: './form-success.component.html',
  styleUrls: ['./form-success.component.scss']
})
export class FormSuccessComponent implements OnInit {

  constructor(private _title: Title) { }

  ngOnInit() {
    this._title.setTitle('Form Success');
  }

}
