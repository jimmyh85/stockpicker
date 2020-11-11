import {
  debounceTime,
  distinctUntilChanged,
  filter,
  skip,
  switchMap,
  takeUntil,
} from 'rxjs/operators';
import { of } from 'rxjs';

export const autocomplete = (time, minLength, selector) => (source$) =>
  source$.pipe(
    debounceTime(time),
    filter((query: string) => query.length >= minLength || query.length === 0),
    distinctUntilChanged(),
    switchMap(
      (query) =>
        query
          ? selector(query) // look for empty query so we can handle it later
              .pipe(takeUntil(source$.pipe(skip(1))))
          : of([]), // return an empty array in case the query was empty
    ),
  );
