import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Constants } from 'src/app/constants/constants';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'solar-home-systems',
  templateUrl: './solar-home-systems.component.html',
  styleUrls: ['./solar-home-systems.component.scss', '../mini-grids/mini-grids.component.scss']
})
export class SolarHomeSystemsComponent implements OnInit {

  dynamicData: any;
  shsDownloadData: any;
  appCardsData: any;
  ressourcesCardsData: any;
  blogData: any;
  constants = Constants;

  constructor(private _data: DataService, private _title: Title) { }

  ngOnInit() {
    this._title.setTitle('Nigeria-SE4ALL | Solar Home Systems');
    this.getDynamicContent();
    this.getApps("subpage-webmap-cards");
    this.getDownloadData("download-section-shs");
    this.getAllArticles("articles");
    this.getRessources("subpage-ressource-cards");
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
   * Fetches SHS Download data from the db
   */
    getDownloadData(apiEndPoint: string) {
      this._data.getDynamicContent(apiEndPoint).subscribe(res => {
        this.shsDownloadData = res;            
      }, error => {
        console.log('An unexpected error occurred');
        console.log(error);
      });
    }
  
    /**
     * Fetches all articles in the db and filter by the shs sector category
     * see https://docs-v3.strapi.io/developer-docs/latest/developer-resources/content-api/content-api.html#filters
     */
     getApps(apiEndPoint: string) {
      this._data.getDynamicContentWithFilter(apiEndPoint, 'category.name=Solar%20Home%20System%20Sector', 'title:ASC').subscribe(res => {
        this.appCardsData = res;
      }, error => {
        console.log('An unexpected error occurred');
        console.log(error);
      });
    }
  
     /**
     * Fetches all Apps cards in the db and filter by the shs category
     * see https://docs-v3.strapi.io/developer-docs/latest/developer-resources/content-api/content-api.html#filters
     */
      getRessources(apiEndPoint: string) {
        this._data.getDynamicContentWithFilter(apiEndPoint, 'category.name=Solar%20Home%20System%20Sector', 'title:ASC').subscribe(res => {
          this.ressourcesCardsData = res;
        }, error => {
          console.log('An unexpected error occurred');
          console.log(error);
        });
      }
  
       /**
     * Fetches all Ressource cards in the db and filter by the shs category
     * see https://docs-v3.strapi.io/developer-docs/latest/developer-resources/content-api/content-api.html#filters
     */
      getAllArticles(apiEndPoint: string) {
        this._data.getDynamicContentWithFilter(apiEndPoint, 'categories.name=Solar%20Home%20System%20Sector', "published_date:ASC").subscribe(res => {
          this.blogData = res;
        }, error => {
          console.log('An unexpected error occurred');
          console.log(error);
        });
      }

}
