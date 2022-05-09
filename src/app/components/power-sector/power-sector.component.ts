import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Constants } from 'src/app/constants/constants';
import { DataService } from 'src/app/services/data.service';
import { single } from './data';

@Component({
  selector: 'power-sector',
  templateUrl: './power-sector.component.html',
  styleUrls: ['./power-sector.component.scss', '../mini-grids/mini-grids.component.scss']
})
export class PowerSectorComponent implements OnInit {

  dynamicData: any;
  poweSectorDownloadData: any;
  appCardsData: any;
  ressourcesCardsData: any;
  blogData: any;
  constants = Constants;

  single: any;
   colorScheme = {
    domain: '#5AA454'
  };

  constructor(private _data: DataService, private _title: Title) {
    Object.assign(this, { single });
   }

  ngOnInit() {
    this._title.setTitle(`${Constants.website_title} | Power Sector`);
    this.getDynamicContent();
    this.getApps("subpage-webmap-cards");
    this.getDownloadData("download-section-power-sectors");
    this.getAllArticles("articles");
    this.getRessources("subpage-ressource-cards");
  }

  format(data: any){
    var currentYear = new Date().getFullYear().toString();
    return data + ' MW projected to ' + currentYear
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
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
   * Fetches power Sector Download data from the db
   */
    getDownloadData(apiEndPoint: string) {
      this._data.getDynamicContent(apiEndPoint).subscribe(res => {
        this.poweSectorDownloadData = res;            
      }, error => {
        console.log('An unexpected error occurred');
        console.log(error);
      });
    }
  
    /**
     * Fetches all articles in the db and filter by the minigrid sector category
     * see https://docs-v3.strapi.io/developer-docs/latest/developer-resources/content-api/content-api.html#filters
     */
     getApps(apiEndPoint: string) {
      this._data.getDynamicContentWithFilter(apiEndPoint, 'category.name=Power%20Sector', 'title:ASC').subscribe(res => {
        this.appCardsData = res;
      }, error => {
        console.log('An unexpected error occurred');
        console.log(error);
      });
    }
  
     /**
     * Fetches all Apps cards in the db and filter by the power sector category
     * see https://docs-v3.strapi.io/developer-docs/latest/developer-resources/content-api/content-api.html#filters
     */
      getRessources(apiEndPoint: string) {
        this._data.getDynamicContentWithFilter(apiEndPoint, 'category.name=Power%20Sector', 'title:ASC').subscribe(res => {
          this.ressourcesCardsData = res;
        }, error => {
          console.log('An unexpected error occurred');
          console.log(error);
        });
      }
  
       /**
     * Fetches all Ressource cards in the db and filter by the power sector category
     * see https://docs-v3.strapi.io/developer-docs/latest/developer-resources/content-api/content-api.html#filters
     */
        getAllArticles(apiEndPoint: string) {
          this._data.getDynamicContentWithFilter(apiEndPoint, 'categories.name=Power%20Sector', "published_date:ASC").subscribe(res => {
            this.blogData = res;
          }, error => {
            console.log('An unexpected error occurred');
            console.log(error);
          });
        }

}
