import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Constants } from 'src/app/constants/constants';


@Component({
  selector: 'blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit {

  slug: any;
  blogPostData: any;
  dynamicData: any;
  staticContent!: Constants;
  constants = Constants;


  constructor(private _route: ActivatedRoute, private _data: DataService, private _title: Title) { }

  ngOnInit() {
    this.fetchBlogPost();
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
   * When the component is initialized, get the slug/url field from the URL params
   * Pass this unique slug field to the service and fetch the corresponding blog post.
   */
  fetchBlogPost(){
    this._route.paramMap.subscribe(params => {
      this.slug = params.get('url');
      this._data.getOneArticle(this.slug).subscribe(res => {
        this.blogPostData = res;         
        this.setPageTitle(this.blogPostData[0].title);
      })
    })
  }

  setPageTitle(title:string){
    this._title.setTitle(title);
  }


}
