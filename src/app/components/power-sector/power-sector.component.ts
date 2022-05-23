import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { Constants } from 'src/app/constants/constants';
import { DataService } from 'src/app/services/data.service';
import ChartAnnotation from 'chartjs-plugin-annotation';
import {Chart} from 'chart.js';


@Component({
  selector: 'power-sector',
  templateUrl: './power-sector.component.html',
  styleUrls: ['./power-sector.component.scss', '../mini-grids/mini-grids.component.scss']
})
export class PowerSectorComponent implements OnInit {

  plugins = [ChartAnnotation];
  dynamicData: any;
  poweSectorDownloadData: any;
  appCardsData: any;
  ressourcesCardsData: any;
  blogData: any;
  plotData: any;
  gaugeData1: any;
  gaugeData2: any;
  gaugeLabel1: any;
  gaugeLabel2: any;
  basicOptions: any;
  capPlot: any;
  regenPlot: any;
  capCategoryPlot: any;
  optionsPlot1: any;
  optionsPlot2: any;
  optionsPlot3: any;
  constants = Constants;
  


  colorSchemeGauge: Color = {
    name: 'gaugePowerSector',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#1dd068'],
  };

  constructor(private _data: DataService, private _title: Title) {
   }

  ngOnInit() {
    Chart.register(ChartAnnotation);
    this._title.setTitle(`${Constants.website_title} | Power Sector`);
    this.getDynamicContent();
    this.getApps("subpage-webmap-cards");
    this.getDownloadData("download-section-power-sectors");
    this.getAllArticles("articles");
    this.getRessources("subpage-ressource-cards");
    this.getPlotData();      
    console.log(this.capPlot);
    
    
  }

  formatgauge1(data: any){
    var currentYear = new Date().getFullYear().toString();    
    return data.toLocaleString()  + ' MW in ' + currentYear;
  }

  formatgauge2(data: any){
    var currentYear = new Date().getFullYear().toString();    
    return data.toLocaleString()  + ' % in ' + currentYear;
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

    /**
     * Fetches all data for the power sector gauges and plots via the Backend which is calling the Se4all database
     * see https://docs-v3.strapi.io/developer-docs/latest/developer-resources/content-api/content-api.html#filters
     */
        getPlotData() {
          this._data.getDynamicContent('se-4-all-databases').subscribe(res => {
          this.plotData = res;
          this.gaugeData1 =  [this.plotData.current_generation];
          this.gaugeData2 =  [this.plotData.current_ren_share];
         //this.gaugeLabel1 = "<b class='gauge-number'>" + this.gaugeData1.value.toString() + " MW </b> projected to "  + new Date().getFullYear().toString();  

          this.capPlot = this.getStackedData([{name: 'capacity', points:this.plotData.series.Capacity}], 1);
          this.regenPlot = this.getStackedData([{name: 'capacity', points:this.plotData.series.Renewable}], 1);
          this.capCategoryPlot = this.getStackedData([
            {name: 'PV', points:this.plotData.series.PV},
            {name: 'Hydro', points:this.plotData.series.Hydro},
            {name: 'Wind', points:this.plotData.series.Wind},
          ], 3);

          }
          , error => {
              console.log('An unexpected error occurred');
              console.log(error);
            });    
        }

        getStackedData(data: any, number_of_series: any,) {
          
          const stackedDataChartType = 'bar';          
          var stackedDataColorScheme;
          if(number_of_series == 1){
            stackedDataColorScheme = ['#1dd068'];
          }
          else{
            stackedDataColorScheme = ['#1dd068', '#ffbb00','black'];
          }

          const stackedDataLegendName: any[] = [];
          const stackedDataPoints: any[] = [];
          
  
          for(let i=0; i < data.length ; i++) {
              stackedDataLegendName.push(data[i].name);
              stackedDataPoints.push(data[i].points);
          }

          var stackedData: any;
          if(number_of_series == 1){
            stackedData = {
              labels: [],
              datasets: [
              {
                  type: stackedDataChartType,
                  label: '',
                  backgroundColor: '',
                  data: []
              }
            ]
          };
          }
          else{
            stackedData = {
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
              },
              {
                  type: stackedDataChartType,
                  label: '',
                  backgroundColor: '',
                  data: []
              }
              ]
          };
          }
         
  
          // set the legend titles
          stackedDataLegendName.forEach( (a:any, i:any) => {
              stackedData.datasets[i].label = a;   
          });
  
          // set the color scheme 
          stackedDataColorScheme.forEach( (a:any, i:any) => {
              stackedData.datasets[i].backgroundColor = a;
          });
  
          // set the values
          stackedDataPoints.forEach( (a:any, i:any) => {
              // console.log(a);
              a.forEach( (b:any, j:any) => {
                  stackedData.datasets[i].data.push(b.value);            
              })
          });
  
          // set the year on the x axis
          for(let i=0; i<1 ; i++){
              for(let j=0; j<stackedDataPoints[i].length ; j++){
                  stackedData.labels.push(stackedDataPoints[i][j].key);
              }
          }
  
  
          this.applyChartOptions();

          return stackedData;
      }

      /** Set Chart Options */
      applyChartOptions() {     
  
        this.optionsPlot1 = {
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
                },
                annotation: {
                  annotations: {
                    target: {
                      type:'line',
                      yMin: 30000,
                      yMax: 30000,
                      borderColor: 'rgb(255, 99, 132)',
                      borderWidth: 3,
                    }
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
              duration: 1000
            }
        };
             
      
      this.optionsPlot2 = {
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
            },
            annotation: {
              annotations: {
                target: {
                  type:'line',
                  yMin: 30,
                  yMax: 30,
                  borderColor: 'rgb(255, 99, 132)',
                  borderWidth: 3,
                }
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
                    text: "%"
                }
            },
        },
        animation: {
          duration: 1000
        }
    }; 

    this.optionsPlot3 = {
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
        duration: 1000
      }
    }; 
  }
}
