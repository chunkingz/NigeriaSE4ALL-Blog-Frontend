import { Component, OnInit, HostListener } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Constants } from 'src/app/constants/constants';
import { DataService } from 'src/app/services/data.service';
import { Subscription } from 'rxjs';
import { AppConfig } from '../../interfaces/IAppConfig';
import { AppconfigService } from '../../services/appconfig.service';
import { ChartsApiService } from 'src/app/services/charts-api.service';
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'mini-grids',
  templateUrl: './mini-grids.component.html',
  styleUrls: ['./mini-grids.component.scss']
})
export class MiniGridsComponent implements OnInit {

    chartsLoaded = false;

//   @HostListener('window:scroll', ['$event']) onScrollEvent(){
//     if(window.scrollY > 1000 && this.chartsLoaded == false){
//         this.getInstalledCapacity();
//         this.getPeopleConnected();
//         this.getCommunitiesConnected();
//         this.getDoughnutAnalytics();
//         this.chartsLoaded = true;
//         }        
//     } 

  doughnutData: any;
  doughnutOptions: any;
  basicData: any;
  basicData2: any;
  basicOptions: any;
  stackedData: any;
  stackedOptions: any;

  installedCapacityData: any;
  installedCapacity: any;

  peopleConnectedData: any;
  peopleConnected: any;

  communitiesConnectedData: any;
  communitiesConnected: any;

  doughnutAnalyticsData: any;
  doughnutAnalytics: any;

  subscription!: Subscription;
  config!: AppConfig;

  dynamicData: any;
  minigridDownloadData: any;
  appCardsData: any;
  ressourcesCardsData: any;
  blogData: any;
  constants = Constants;

  constructor(private _data: DataService, private _title: Title, private configService: AppconfigService, private _charts: ChartsApiService) { }

  ngOnInit() {
    this._title.setTitle(`${Constants.website_title} | Mini-Grids`);
    this.getDynamicContent("dynamic-blog-content");
    this.getApps("subpage-webmap-cards");
    this.getDownloadData("download-section-minigrids");
    this.getAllArticles("articles");
    this.getRessources("subpage-ressource-cards");

    // charts    
    setTimeout(()=>{                         
        this.getInstalledCapacity();
    }, 1000);
   setTimeout(()=>{                         
    this.getPeopleConnected();
    }, 1000);
    setTimeout(()=>{                         
        this.getCommunitiesConnected();
    }, 1000);
    setTimeout(()=>{                         
        this.getDoughnutAnalytics();
    }, 1000);
  }

  /**
   * Fetches all dynamic data from the db
   */
   getDynamicContent(apiEndPoint:string) {
    this._data.getDynamicContent(apiEndPoint).subscribe(res => {
      this.dynamicData = [res];
    }, error => {
      console.log('An unexpected error occurred');
      console.log(error.message);
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
      console.log(error.message);
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
      console.log(error.message);
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
        console.log(error.message);
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
          console.log(error.message);
        });
      }

/***************** CHARTS CONFIG *************************/

    /** Fetch Chart API data */
    getInstalledCapacity() {
    let getterOptions = {
        headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`).set('Content-Type', 'application/json')
    };
      this._charts.getInstalledCapacity(getterOptions).subscribe( (res:any) => {
          this.installedCapacityData = [res];
          this.installedCapacity = res;
  
          this.getStackedData();
      }, error => {
          console.log(error);
      });
      }
  
      getPeopleConnected() {
        let getterOptions = {
            headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`).set('Content-Type', 'application/json')
        };
      this._charts.getPeopleAndCommunitiesConnected(getterOptions).subscribe( (res:any) => {
          this.peopleConnectedData = [res];        
          this.peopleConnected = res;
  
          this.getBasicData1();
      }, error => {
          console.log(error);
      });
      }
      
      getCommunitiesConnected() {
        let getterOptions = {
            headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`).set('Content-Type', 'application/json')
        };
      this._charts.getPeopleAndCommunitiesConnected(getterOptions).subscribe( (res:any) => {
          this.communitiesConnectedData = [res];        
          this.communitiesConnected = res;
  
          this.getBasicData2();
      }, error => {
          console.log(error);
      });
      }
  
      getDoughnutAnalytics() {
        let getterOptions = {
            headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`).set('Content-Type', 'application/json')
        };
      this._charts.getDoughnutAnalytics(getterOptions).subscribe( (res:any) => {
          this.doughnutAnalyticsData = [res];        
          this.doughnutAnalytics = res;
  
          this.getDoughnutData();
      }, error => {
          console.log(error);
      });
      }
  
      /** Set Chart Data */
  
      getStackedData() {
  
          const stackedDataChartType = 'bar';
          const stackedDataColorScheme = ['#1dd068', '#ffbb00'];
          const stackedDataCapData = this.installedCapacity.installedCapacity.series;
          const stackedDataLegendName: any[] = [];
          const stackedDataPoints: any[] = [];
          
  
          for(let i=0; i < stackedDataCapData.length ; i++) {
              stackedDataLegendName.push(stackedDataCapData[i].name);
              stackedDataPoints.push(stackedDataCapData[i].points);
          }
  
          this.stackedData = {
              labels: [],
              datasets: [
              {
                  type: stackedDataChartType,
                  label: '',
                  backgroundColor: '',
                  data: []
              },
              {
                  type: stackedDataChartType,
                  label: '',
                  backgroundColor: '',
                  data: []
              }
              ]
          };
  
          // set the legend titles
          stackedDataLegendName.forEach( (a:any, i:any) => {
              this.stackedData.datasets[i].label = a;   
          });
  
          // set the color scheme 
          stackedDataColorScheme.forEach( (a:any, i:any) => {
              this.stackedData.datasets[i].backgroundColor = a;
          });
  
          // set the values
          stackedDataPoints.forEach( (a:any, i:any) => {
              // console.log(a);
              a.forEach( (b:any, j:any) => {
                  this.stackedData.datasets[i].data.push(b.value);            
              })
          });
  
          // set the year on the x axis
          for(let i=0; i<1 ; i++){
              for(let j=0; j<stackedDataPoints[i].length ; j++){
                  this.stackedData.labels.push(new Date(stackedDataPoints[i][j].key).getFullYear());
              }
          }
  
  
          this.applyChartOptions();
      }
  
      getBasicData1(){
  
          const basicDataLabel = 'People Connected';
          const basicDataBackgroundColor = '#93939f';
          const basicDataBorderColor = '#93939f';
          const basicData1Points = this.peopleConnected.peopleConnected.points;
  
          this.basicData = {
          labels: [],
          datasets: [
              {
                  label: basicDataLabel,
                  backgroundColor: basicDataBackgroundColor,
                  borderColor: basicDataBorderColor,
                  data: []
              },
          ]
          };
  
          // set the values
          basicData1Points.forEach( (a:any, i:any) => {
              this.basicData.datasets[0].data.push(a.value);
          });
  
          // set the year on the x axis
          for(let i=0; i<basicData1Points.length ; i++){                
              this.basicData.labels.push(basicData1Points[i].key);
          }
  
          this.applyChartOptions();
      }
  
      getBasicData2(){
  
          const basicDataLabel = 'Communities Connected';
          const basicDataBackgroundColor = '#93939f';
          const basicDataBorderColor = '#93939f';
          const basicData2Points = this.communitiesConnected.communitiesConnected.points;        
  
          this.basicData2 = {
              labels: [],
              datasets: [
                  {
                      label: basicDataLabel,
                      backgroundColor: basicDataBackgroundColor,
                      borderColor: basicDataBorderColor,
                      data: []
                  },
              ]
          };
  
          // set the values
          basicData2Points.forEach( (a:any, i:any) => {
              this.basicData2.datasets[0].data.push(a.value);
          });
  
          // set the year on the x axis
          for(let i=0; i<basicData2Points.length ; i++){                
              this.basicData2.labels.push(basicData2Points[i].key);
          }
  
          this.applyChartOptions();
      }
  
      getDoughnutData(){
  
          const doughnutBackgroundColor = ["#1dd068","#ffbb00","#e0e2e9","#b91108","#000","#3734eb","#eb34dc"];
          const doughnutHoverColor = ["#1dd068","#ffbb00","#e0e2e9","#b91108","#000","#3734eb","#eb34dc"];
          
          this.doughnutData = {
              labels: [],
              datasets: [
                  {
                      data: [],
                      backgroundColor: doughnutBackgroundColor,
                      hoverBackgroundColor: doughnutHoverColor
                  }
              ]
          };
  
          // set the values
          this.doughnutAnalytics.forEach( (a:any, i:any) => {
              this.doughnutData.datasets[0].data.push(a.item2);
          });
  
          // set the doughnut legend
          for(let i=0; i<this.doughnutAnalytics.length ; i++){                
              this.doughnutData.labels.push(this.doughnutAnalytics[i].item1);
          }
          
          this.applyChartOptions();
      }
  
      /** Set Chart Options */
      applyChartOptions() {
  
          this.basicOptions = {
              plugins: {
                  legend: {
                      display: false,
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
                      display: false,
                      ticks: {
                          color: '#495057'
                      },
                      grid: {
                          color: '#fff'
                      }
                  }
              },
              animation: {
                duration: 5000
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
                          color: '#495057',                          
                      },
                      position: 'bottom'
                  },
                  title:{
                      display: false,
                      padding: {
                          top: 10,
                          bottom: 40
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
                      },
                      title: {
                          display: true,
                          text: "MW"
                      }
                  },
              },
              animation: {
                duration: 5000
              }
          };
  
          this.doughnutOptions = {
              plugins: {
                  legend: {
                      display: true,
                      position: 'bottom'
                  },
                  title:{
                    display: true,
                    padding: {
                        top: 10,
                        bottom: 40
                    }
                }
              },
              animation: {
                duration: 5000
              }
          };
      }
  
}
