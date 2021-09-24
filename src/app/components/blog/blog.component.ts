import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  blogData: any;
  blogTags: any;
  categoriesData: any;

  constructor(private _data: DataService, private _title: Title) { }

  ngOnInit() {
    this._title.setTitle('SE4ALL Blog');
    this.getAllArticles();
    this.getAllCategories();
  }

  /**
   * Fetches all articles in the db
   */
  getAllArticles() {
    this._data.getArticles().subscribe(res => {
      // console.log(res);
      this.blogData = res;
    }, error => {
      console.log('An unexpected error occurred');
      console.log(error);
    });
  }


  /**
   * Fetches all categories in the db
   */
   getAllCategories() {
    this._data.getCategories().subscribe(res => {
      // console.log(res2);
      this.categoriesData = res;
    }, error => {
      console.log('An unexpected error occurred');
      console.log(error);
    });
  }

}
