import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'coding-challenge-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @Input() data$: Observable<any>;
  @Input() fromDate: any;
  @Input() toDate: any;
  chartData: any;

  chart: {
    title: string;
    type: string;
    data: any;
    columnNames: string[];
    options: any;
  };
  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.chart = {
      title: '',
      type: 'LineChart',
      data: [],
      columnNames: ['period', 'close'],
      options: { title: `Stock price`, width: '600', height: '400' }
    };

    this.data$.subscribe(newData => {
      console.log('newData', newData);
      if (this.fromDate && this.toDate) {
        let from = new Date(this.fromDate).toISOString().split('T')[0];
        let to = new Date(this.toDate).toISOString().split('T')[0];
        let filterData = newData.filter(e => (e[0] >= from && e[0] <= to));
        this.chartData = filterData
      }
      else {
        this.chartData = newData
      }
    });
  }
}
