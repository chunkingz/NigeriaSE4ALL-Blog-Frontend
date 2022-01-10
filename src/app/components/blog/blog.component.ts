import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DataService } from 'src/app/services/data.service';
import { blogAnimation } from '../animation/blog.component.animation';
import { Constants } from 'src/app/constants/constants';

@Component({
  selector: 'blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  animations: [ blogAnimation ]
})
export class BlogComponent implements OnInit {

  blogData: any;
  dynamicData: any;
  staticContent!: Constants;
  constants = Constants;

  constructor(private _data: DataService, private _title: Title) { }

  ngOnInit() {
    this._title.setTitle('SE4ALL Blog');
    this.getAllArticles();
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

  /**
   * Fetches all articles in the db
   */
  getAllArticles() {
    this._data.getArticles().subscribe(res => {
      this.blogData = res;
    }, error => {
      console.log('An unexpected error occurred');
      console.log(error);
    });
  }


}
