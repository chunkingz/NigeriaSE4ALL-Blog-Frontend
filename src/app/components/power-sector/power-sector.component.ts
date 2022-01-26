import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/constants/constants';
import { DataService } from 'src/app/services/data.service';

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

  constructor(private _data: DataService) { }

  ngOnInit(): void {
    this.getDynamicContent();
    this.getApps("subpage-webmap-cards");
    this.getDownloadData("download-section-power-sectors");
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
      this._data.getDynamicContentWithFilter(apiEndPoint, 'category.name=Power%20Sector').subscribe(res => {
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
        this._data.getDynamicContentWithFilter(apiEndPoint, 'category.name=Power%20Sector').subscribe(res => {
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
          this._data.getDynamicContentWithFilter(apiEndPoint, 'categories.name=Power%20Sector').subscribe(res => {
            this.blogData = res;
          }, error => {
            console.log('An unexpected error occurred');
            console.log(error);
          });
        }

}
