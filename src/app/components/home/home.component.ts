import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Constants } from 'src/app/constants/constants';
import { DataService } from 'src/app/services/data.service';
import { homeAnimation } from '../animation/animation';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [ homeAnimation ]
})
export class HomeComponent implements OnInit {

  dynamicData: any;
  section3DynamicData: any;
  section4DynamicData: any;
  blogData: any;
  constants = Constants;

  constructor(private _data: DataService, private _title: Title) { }

  ngOnInit() {
    this._title.setTitle(`${Constants.website_title}`);
    this.getHomeDynamicContent("dynamic-blog-content");
    this.getSection3DynamicContent("home-section-3-cards");
    this.getSection4DynamicContent("home-section-4-cards");
    this.getAllBlogArticles("articles");

  }

  /**
   * Fetches all dynamic data from the db
   */
   getHomeDynamicContent(apiEndPoint: string) {
    this._data.getDynamicContent(apiEndPoint).subscribe(res => {
      this.dynamicData = [res];      
    }, error => {
      console.log('An unexpected error occurred');
      console.log(error.message);
    });
  }

  /**
   * Fetches Section 3 dynamic data from the db
   */
   getSection3DynamicContent(apiEndPoint: string) {
    this._data.getDynamicContent(apiEndPoint, "card_title:ASC").subscribe(res => {
      this.section3DynamicData = res;      
    }, error => {
      console.log('An unexpected error occurred');
      console.log(error.message);
    });
  }

  /**
   * Fetches Section 4 dynamic data from the db
   */
   getSection4DynamicContent(apiEndPoint: string) {
    this._data.getDynamicContent(apiEndPoint, "card_tag_title:ASC").subscribe(res => {
      this.section4DynamicData = res;      
    }, error => {
      console.log('An unexpected error occurred');
      console.log(error.message);
    });
  }

  /**
   * Fetches all blog articles in the db
   * see https://docs-v3.strapi.io/developer-docs/latest/developer-resources/content-api/content-api.html#filters
   */
   getAllBlogArticles(apiEndPoint: string) {
    this._data.getDynamicContent(apiEndPoint, "published_date:DESC").subscribe(res => {
      this.blogData = res;
      this.blogData = this.blogData.slice(0,5);
    }, error => {
      console.log('An unexpected error occurred');
      console.log(error.message);
    });
  }

  scroll(target: any) {
    document.querySelector(target).scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}
