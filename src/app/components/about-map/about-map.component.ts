import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'about-map',
  templateUrl: './about-map.component.html',
  styleUrls: ['./about-map.component.scss']
})
export class AboutMapComponent implements OnInit {

  constructor(private _title: Title) { }

  ngOnInit() {
    this._title.setTitle('Nigeria-SE4ALL | About Map');
  }

}
