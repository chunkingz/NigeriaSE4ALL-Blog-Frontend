import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Constants } from 'src/app/constants/constants';
import { DataService } from 'src/app/services/data.service';
// import { barchart0, barchart0CustomColors, barchart1, barchart1CustomColors, barchart2CustomColors, barchart2, pieChartData, pieChartCustomColors } from '../../helpers/chart-data';
// import { LegendPosition } from '@swimlane/ngx-charts';
import { Subscription } from 'rxjs';
import { AppConfig } from '../../interfaces/IAppConfig';
import { AppconfigService } from '../../services/appconfig.service';


@Component({
  selector: 'mini-grids',
  templateUrl: './mini-grids.component.html',
  styleUrls: ['./mini-grids.component.scss']
})
export class MiniGridsComponent implements OnInit {

  doughnutData: any;
  doughnutOptions: any;
  basicData: any;
  basicOptions: any;
  stackedData: any;
  stackedData2: any;
  stackedOptions: any;
  subscription!: Subscription;
  config!: AppConfig;

  dynamicData: any;
  minigridDownloadData: any;
  appCardsData: any;
  ressourcesCardsData: any;
  blogData: any;
  constants = Constants;

  constructor(private _data: DataService, private _title: Title, private configService: AppconfigService) { }

  ngOnInit() {
    this._title.setTitle('Nigeria-SE4ALL | Mini-Grids');
    this.getDynamicContent("dynamic-blog-content");
    this.getApps("subpage-webmap-cards");
    this.getDownloadData("download-section-minigrids");
    this.getAllArticles("articles");
    this.getRessources("subpage-ressource-cards");
    this.getChartData();
    // Object.assign(this, { barchart0, barchart0CustomColors, barchart1, barchart1CustomColors, barchart2CustomColors, barchart2, pieChartData, pieChartCustomColors });
  }


  // charts config


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


getChartData() {

  this.basicData = {
    labels: [2016, 2017, 2018, 2019, 2020, 2021],
    datasets: [
        {
            label: 'Commercial',
            backgroundColor: '#1dd068',
            borderColor: '#1dd068',
            data: [0, 9, 24, 257, 420, 1289]
        },
        {
            label: 'Residential',
            backgroundColor: '#ffbb00',
            borderColor: '#ffbb00',
            data: [0, 165, 189, 1573, 3089, 11575]
        },
        {
          label: 'Productive',
          backgroundColor: '#e0e2e9',
          borderColor: '#e0e2e9',
          data: [0, 0, 0, 42, 61, 239]
        },
        {
          label: 'Public',
          backgroundColor: '#b91108',
          borderColor: '#b91108',
          data: [0, 2, 7, 7, 22, 130]
        },
    ]
  };

  this.stackedData = {
    labels: [2019, 2020, 2021],
    datasets: [{
        type: 'bar',
        label: 'Commercial',
        backgroundColor: '#1dd068',
        data: [
            30,
            60,
            96
        ]
    }, {
        type: 'bar',
        label: 'Productive',
        backgroundColor: '#ffbb00',
        data: [
            2,
            4,
            12
        ]
    }]
  };

  this.stackedData2 = {
    labels: [2019, 2020, 2021],
    datasets: [{
        type: 'bar',
        label: 'Direct',
        backgroundColor: '#1dd068',
        data: [
            10,
            11,
            16
        ]
    }, {
        type: 'bar',
        label: 'Indirect',
        backgroundColor: '#ffbb00',
        data: [
            2,
            37,
            22
        ]
    }]
  };

  this.doughnutData = {
  labels: ['Neither satisfied or unsatisfied','Somehow satisfied','Somehow unsatisfied','Very satisfied','Very unsatisfied'],
  datasets: [
      {
          data: ['6', '50', '8', '36', '1'],
          backgroundColor: [
              "#1dd068",
              "#ffbb00",
              "#e0e2e9",
              "#b91108",
              "#000",
          ],
          hoverBackgroundColor: [
              "#1dd068",
              "#ffbb00",
              "#e0e2e9",
              "#b91108",
              "#000"
          ]
      }
  ]
  };

  this.applyLightTheme();
  this.config = this.configService.config;
  this.subscription = this.configService.configUpdate$.subscribe(config => {
      this.config = config;
  });
  }

  applyLightTheme() {

    this.basicOptions = {
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#fff'
                }
            },
            y: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#fff'
                }
            }
        }
    };

    this.stackedOptions = {
        plugins: {
            tooltips: {
                mode: 'index',
                intersect: false
            },
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        },
        scales: {
            x: {
                stacked: true,
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#fff'
                }
            },
            y: {
                stacked: true,
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#fff'
                }
            }
        }
    };

    this.doughnutOptions = {
        plugins: {
            legend: {
                display: true,
                position: 'right'
            }
        }
    };
  }
}
