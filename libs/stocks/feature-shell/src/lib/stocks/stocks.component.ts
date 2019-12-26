import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { MatDatepickerInputEvent } from '@angular/material';

@Component({
  selector: 'coding-challenge-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  stockPickerForm: FormGroup;
  symbol: string;
  period: string;
  @Output() 
  dateChange:EventEmitter< MatDatepickerInputEvent< any>>;
  quotes$ = this.priceQuery.priceQueries$;

  //today's date
  todaydate: Date = new Date();

  timePeriods = [
    { viewValue: 'All available data', value: 'max' },
    { viewValue: 'Five years', value: '5y' },
    { viewValue: 'Two years', value: '2y' },
    { viewValue: 'One year', value: '1y' },
    { viewValue: 'Year-to-date', value: 'ytd' },
    { viewValue: 'Six months', value: '6m' },
    { viewValue: 'Three months', value: '3m' },
    { viewValue: 'One month', value: '1m' }
  ];

  constructor(private fb: FormBuilder, private priceQuery: PriceQueryFacade) {
    this.stockPickerForm = fb.group({
      symbol: [null, Validators.required],
      period: [null],
      fromDate: [null],
      toDate: [null]
    });
  }

  ngOnInit() { }

  fetchQuote() {
    if (this.stockPickerForm.valid) {
      this.priceQuery.fetchQuote(this.stockPickerForm.value.symbol, 'max');
    }
  }

  onDateChanged(event) {
    this.stockPickerForm.get('period').setValue(null);
  }

  periodChange() {
    const { symbol, period } = this.stockPickerForm.value;
    this.priceQuery.fetchQuote(symbol, period);
    this.stockPickerForm.get('fromDate').setValue(null);
    this.stockPickerForm.get('toDate').setValue(null);
  }
}
