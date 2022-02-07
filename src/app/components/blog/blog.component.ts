import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DataService } from 'src/app/services/data.service';
import { blogAnimation } from '../animation/animation';
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
  constants = Constants;

  constructor(private _data: DataService, private _title: Title) { }

  ngOnInit() {
    this._title.setTitle('SE4ALL Blog');
    this.getAllArticles("articles");
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
   * Fetches all articles in the db
   */
  getAllArticles(apiEndPoint: string) {
    this._data.getDynamicContent(apiEndPoint).subscribe(res => {
      this.blogData = res;
    }, error => {
      console.log('An unexpected error occurred');
      console.log(error);
    });
  }


}
