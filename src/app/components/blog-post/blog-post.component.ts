import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit {

  slug: any;
  blogPostData: any;

  constructor(private _route: ActivatedRoute, private _data: DataService, private _title: Title) { }

  ngOnInit() {
    this.fetchBlogPost();
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
