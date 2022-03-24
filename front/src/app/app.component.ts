import { Component, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { IndexService } from './Services/index.service';
import { BaseChartDirective } from 'ng2-charts';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  public automaticChart: boolean = false
 
  public isDangerous: boolean = false

  public chartLabels = ["1", "2", "3", "4", "5", "6","7"]

  public sensorData: {value: any, date: any, style: string}[] = []

  public dateDanger: {value: number, date: Date} = {value: 0, date: new Date()}

  public lineChartData: ChartConfiguration["data"] = {
    labels: this.chartLabels,
    datasets: [
      {
        data: [],
        label: 'Propano',
        backgroundColor: 'rgba(110,218,255,0.6)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
    ]
  }

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      
    },
    plugins: {
      legend: { display: true },
    }
  };

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public lineChartType: ChartType = 'line';

  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  constructor(
    public indexService: IndexService,
  ) { 
    
  }

  ngOnInit(): void {
    this.updateDataChart()
  }

  getDataSensor = () => {
    this.indexService.getDataSensor().subscribe(data => {
      this.sensorData.length = 0
      let i = this.chartLabels?.length
      data.forEach(val => {
        i = i + 1
        this.lineChartData?.datasets[0]?.data?.push(val.value)
        this.sensorData.push({value: val.value, date: val.date, style: val.value >= 500 ? "text-red-500":"text-cyan-500"})
        this.lineChartData?.labels?.push(i);
        if (val.value >= 500){
          this.isDangerous = true
          this.dateDanger = {value: val.value, date: val.date}
        }
        this.chart?.update()
        let list = document.getElementById("list")
        list?.scroll({top: 24})
      })
      this.sensorData.push({value: "", date: "", style:  ""})
    })
  }

  updateDataChart = () => {
    setInterval(() => {
      if (this.automaticChart) {
        // this.lineChartData.datasets[0].data.length = 0
        this.getDataSensor()
      }
      console.log("SEARCH")
    }, 15000)
  }

  changeStateChart = () => {
    this.automaticChart = !this.automaticChart
  }
}
