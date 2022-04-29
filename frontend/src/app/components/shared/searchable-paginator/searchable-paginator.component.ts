import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, filter, map } from 'rxjs/operators';
import { UsersFilter } from 'src/app/models/user.model';

@Component({
    selector: 'app-searchable-paginator',
    templateUrl: './searchable-paginator.component.html',
    styleUrls: ['./searchable-paginator.component.scss'],
})
export class SearchablePaginatorComponent {
  @Input() searchText: string | undefined;
  @ViewChild('searchInputField') searchInputField: ElementRef | undefined;

  @Input() pageSize: number | undefined;

  @Input() pageIndex: number | undefined;

  @Input() itemCount: number | undefined;

  @Output() paginationOrSearchChange = new EventEmitter<UsersFilter>();

  searchTextChange() {
      if (this.searchInputField?.nativeElement) {
          fromEvent(this.searchInputField.nativeElement, 'keyup')
              .pipe(
                  filter(Boolean),
                  debounceTime(800),
                  map(() => {
                      console.log(this.searchInputField, this.searchText, this.pageIndex, this.pageSize);
                      if (
                          this.searchInputField != undefined &&
              this.searchText != undefined &&
              this.pageIndex != undefined &&
              this.pageSize != undefined
                      ) {
                          this.pageIndex = this.pageIndex < 0 ? 0 : this.pageIndex;
                          console.log(this.searchInputField.nativeElement.value);
                          this.paginationOrSearchChange.emit({
                              searchText: this.searchText,
                              pageIndex: this.pageIndex,
                              pageSize: this.pageSize,
                          });
                      }
                  })
              )
              .subscribe();
      }
  }
  paginationChange(pageIndex: number, pageSize: number) {
      pageIndex = pageIndex < 0 ? 0 : pageIndex;
      this.paginationOrSearchChange.emit({
          searchText: this.searchText ? this.searchText : '',
          pageIndex: pageIndex,
          pageSize: pageSize,
      });
  }

  getPagesArray(itemCount: number, pageSize: number): Array<number> {
      const arrlen = Math.floor((itemCount - 1) / pageSize + 1);
      return Array(arrlen);
  }

  getPagesCount(itemCount: number, pageSize: number): number {
      return Math.floor((itemCount - 1) / pageSize + 1);
  }
}
