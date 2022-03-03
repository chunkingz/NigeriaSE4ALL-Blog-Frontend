import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Constants } from 'src/app/constants/constants';
import { DataService } from 'src/app/services/data.service';
import { barchart0, barchart0CustomColors, barchart1, barchart1CustomColors, barchart2CustomColors, barchart2, pieChartData, pieChartCustomColors } from '../../helpers/chart-data';
import { LegendPosition } from '@swimlane/ngx-charts';


@Component({
  selector: 'mini-grids',
  templateUrl: './mini-grids.component.html',
  styleUrls: ['./mini-grids.component.scss']
})
export class MiniGridsComponent implements OnInit {

  dynamicData: any;
  minigridDownloadData: any;
  appCardsData: any;
  ressourcesCardsData: any;
  blogData: any;
  constants = Constants;

  constructor(private _data: DataService, private _title: Title) { }

  ngOnInit() {
    this._title.setTitle('Nigeria-SE4ALL | Mini-Grids');
    this.getDynamicContent("dynamic-blog-content");
    this.getApps("subpage-webmap-cards");
    this.getDownloadData("download-section-minigrids");
    this.getAllArticles("articles");
    this.getRessources("subpage-ressource-cards");
    Object.assign(this, { barchart0, barchart0CustomColors, barchart1, barchart1CustomColors, barchart2CustomColors, barchart2, pieChartData, pieChartCustomColors });
  }


  // charts config
  view: [number, number] = [600,300];
  barchart0CustomColors: any[] | undefined;
  barchart0: any[] | undefined;
  barchart1CustomColors: any[] | undefined;
  barchart1: any[] | undefined;
  barchart2CustomColors: any[] | undefined;
  barchart2: any[] | undefined;
  pieChartData: any[] | undefined;
  pieChartCustomColors: any[] | undefined;
  showGridLines = true
  isDoughnut = true
  below = LegendPosition.Below
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  showLabels = true;
  showTimeline = true;

  /**
   * Fetches all dynamic data from the db
   */
   getDynamicContent(apiEndPoint:string) {
    this._data.getDynamicContent(apiEndPoint).subscribe(res => {
      this.dynamicData = [res];
    }, error => {
      console.log('An unexpected error occurred');
      console.log(error);
    });
  }

  /**
   * Fetches Minigrid Download data from the db
   */
   getDownloadData(apiEndPoint: string) {
    this._data.getDynamicContent(apiEndPoint).subscribe(res => {
      this.minigridDownloadData = res;            
    }, error => {
      console.log('An unexpected error occurred');
      console.log(error);
    });
  }

  /**
   * Fetches all articles in the db and filter by the minigrid category
   * see https://docs-v3.strapi.io/developer-docs/latest/developer-resources/content-api/content-api.html#filters
   */
   getApps(apiEndPoint: string) {
    this._data.getDynamicContentWithFilter(apiEndPoint, 'category.name=Minigrid%20Sector', 'title:ASC').subscribe(res => {
      this.appCardsData = res;
    }, error => {
      console.log('An unexpected error occurred');
      console.log(error);
    });
  }

   /**
   * Fetches all Apps cards in the db and filter by the minigrid category
   * see https://docs-v3.strapi.io/developer-docs/latest/developer-resources/content-api/content-api.html#filters
   */
    getRessources(apiEndPoint: string) {
      this._data.getDynamicContentWithFilter(apiEndPoint, 'category.name=Minigrid%20Sector', 'title:ASC').subscribe(res => {
        this.ressourcesCardsData = res;
      }, error => {
        console.log('An unexpected error occurred');
        console.log(error);
      });
    }

     /**
   * Fetches all Ressource cards in the db and filter by the minigrid category
   * see https://docs-v3.strapi.io/developer-docs/latest/developer-resources/content-api/content-api.html#filters
   */
      getAllArticles(apiEndPoint: string) {
        this._data.getDynamicContentWithFilter(apiEndPoint, 'categories.name=Minigrid%20Sector', "published_date:ASC").subscribe(res => {
          this.blogData = res;
        }, error => {
          console.log('An unexpected error occurred');
          console.log(error);
        });
      }

}
