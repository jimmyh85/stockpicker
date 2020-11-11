import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StockDataService {
  data = ['one', 'two', 'three', 'one1', 'two2', 'three3'];

  constructor(private http: HttpClient) {}

  getStocks(query: any): Observable<any> {
    // return this.http.get('https://cat-fact.herokuapp.com/?search=' + query);
    return of(this.data.filter((i) => i.startsWith(query)));
  }
}
