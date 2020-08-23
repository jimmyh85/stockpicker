import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {autocomplete} from "../../shared/autocomplete-helper";
import {StockDataService} from "../../services/stock-data.service";
import {debounceTime, distinctUntilChanged, filter, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-stock-search',
  templateUrl: './stock-search.component.html',
  styleUrls: ['./stock-search.component.scss']
})
export class StockSearchComponent implements OnInit {

  searchQuery = new FormControl('');
  searchQuery$ = this.searchQuery.valueChanges;

  // results$ = this.searchQuery$.pipe(
  //   autocomplete(1000, 2, query => this.stockDataService.getStocks(query))
  // );

  results$ = this.searchQuery$.pipe(
    filter(text => text.length >= 1),
    debounceTime(10),
    distinctUntilChanged(),
    switchMap(value => this.stockDataService.getStocks(value))
  );

  constructor(private stockDataService: StockDataService) { }

  ngOnInit(): void {
  }

}
