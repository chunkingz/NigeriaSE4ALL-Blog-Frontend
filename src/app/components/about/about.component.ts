import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(private _title: Title) { }

  ngOnInit() {
    this._title.setTitle('Nigeria-SE4ALL | About');
  }

}
