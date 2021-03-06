import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { blogAnimation } from '../animation/animation';
import { Constants } from 'src/app/constants/constants';

@Component({
  selector: 'blog-category',
  templateUrl: './blog-category.component.html',
  styleUrls: ['./blog-category.component.scss'],
  animations: [ blogAnimation ]
})
export class BlogCategoryComponent implements OnInit {

  slug: any;
  blogPostData: any;
  blogPosts: any;
  title:any;
  categoriesData: any;
  dynamicData: any;
  constants = Constants;


  constructor(private _route: ActivatedRoute, private _data: DataService, private _title: Title) { }

  ngOnInit() {
    this._title.setTitle(`${Constants.website_title}`);
    this.fetchBlogPosts();
    this.getAllCategories("categories");
    this.getDynamicContent("dynamic-blog-content");
  }


  /**
   * Fetches all dynamic data from the db
   */
   getDynamicContent(apiEndPoint: string) {
    this._data.getDynamicContent(apiEndPoint).subscribe(res => {
      this.dynamicData = [res];
    }, error => {
      console.log('An unexpected error occurred');
      console.log(error);
    });
  }


  /**
   * When the component is initialized, get the slug/url field from the URL params
   * Pass this unique slug field to the service and fetch the corresponding blog post.
   */
   fetchBlogPosts(){
    this._route.paramMap.subscribe(params => {
      this.slug = params.get('category');
      this._data.getOneCategory(this.slug).subscribe(res => {
        this.blogPostData = res; 
        this.blogPosts = this.blogPostData[0].articles
        this.title = this.blogPostData[0].name;

        this.setPageTitle(this.title);
      })
    })
  }

  setPageTitle(title:string){
    this._title.setTitle(`Blog Category: ${title}`);
  }

  /**
   * Fetches all categories in the db
   */
   getAllCategories(apiEndPoint: string) {
    this._data.getDynamicContent(apiEndPoint).subscribe(res => {
      this.categoriesData = res;
    }, error => {
      console.log('An unexpected error occurred');
      console.log(error);
    });
  }
}
