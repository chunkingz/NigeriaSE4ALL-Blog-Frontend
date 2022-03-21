import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Constants } from 'src/app/constants/constants';

@Component({
  selector: 'about-map',
  templateUrl: './about-map.component.html',
  styleUrls: ['./about-map.component.scss']
})
export class AboutMapComponent implements OnInit {

  constructor(private _title: Title) { }

  ngOnInit() {
    this._title.setTitle(`${Constants.website_title} | About Map`);
  }

}
