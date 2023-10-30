import { Component, OnInit, OnDestroy} from '@angular/core';
import { Store } from '@ngrx/store';
import {
  ReadingListBook,
  addToReadingList,
  clearSearch,
  getAllBooks,
  searchBooks
} from '@tmo/books/data-access';
import { FormBuilder } from '@angular/forms';
import { Book } from '@tmo/shared/models';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit, OnDestroy {
  books: ReadingListBook[];
  bookList$=this.store.select(getAllBooks);
  searchForm = this.form.group({
    term: ''
  });

  unSubscribeSubject$ = new Subject();
  constructor(
    private readonly store: Store,
    private readonly form: FormBuilder
  ) {}

  get searchTerm(): string {
    return this.searchForm.value.term;
  }

  ngOnInit(): void {
    this.searchForm.controls['term'].valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      takeUntil(this.unSubscribeSubject$))
      .subscribe(() => this.searchBooks(),
        err => console.error(err, 'Something went wrong in searching books')
      );
  }

  ngOnDestroy(): any {
    this.unSubscribeSubject$.next();
    this.unSubscribeSubject$.complete();
  }


  addBookToReadingList(book: Book) {
    this.store.dispatch(addToReadingList({ book }));
  }

  searchExample() {
    this.searchForm.controls.term.setValue('javascript');
    this.searchBooks();
  }

  searchBooks() {
    if (this.searchForm.value.term) {
      this.store.dispatch(searchBooks({ term: this.searchTerm }));
    } else {
      this.store.dispatch(clearSearch());
    }
  }
}