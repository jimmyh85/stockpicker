import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  skip,
  startWith,
  switchMap,
} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { autocomplete } from '../../shared/autocomplete-helper';
import { StockDataService } from '../../services/stock-data.service';

@Component({
  selector: 'app-stock-search',
  templateUrl: './stock-search.component.html',
  styleUrls: ['./stock-search.component.scss'],
})
export class StockSearchComponent implements OnInit {
  searchQuery = new FormControl('');

  searchQuery$ = this.searchQuery.valueChanges.pipe(startWith(''));

  results$: Observable<string[]>;

  // results$ = this.searchQuery$.pipe(
  //   filter(text => text.length >= 1),
  //   debounceTime(10),
  //   distinctUntilChanged(),
  //   switchMap(value => this.stockDataService.getStocks(value))
  // );

  constructor(private stockDataService: StockDataService) {
    this.results$ = this.searchQuery$.pipe(
      autocomplete(1000, 1, (query) => this.stockDataService.getStocks(query)),
    );
  }

  ngOnInit(): void {}
}
