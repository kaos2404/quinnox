import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { FormControl } from "@angular/forms";
import { debounceTime } from "rxjs/operators";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() public list: any[];
  @Input() public maxPages = 5;
  @Input() public itemsPerPage = 10;
  public items: any[];
  public page: FormControl;
  public pages: number[] = [1];
  public scope = [1, 3];
  public totalItems: number;

  constructor() {
    this.list = [];
    this.totalItems = 0;
    this.items = [];
    this.page = new FormControl(null);
    this.page.valueChanges.pipe(debounceTime(200)).subscribe((data) => {
      this.recalculateScope(data);
      this.pageChanged(data);
    });
  }

  ngOnInit() {
    setTimeout(() => this.recalculateScope(this.page.value), 100);
    this.scope[1] = this.maxPages;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.list) {
      // this.items = this.list
      this.totalItems = this.list.length;
      this.pages = Array(Math.ceil(this.totalItems / this.itemsPerPage))
        .fill(0)
        .map((v, i) => i + 1);
      this.page.setValue(1);
    }
  }

  onPageClicked(event: Event, page: number) {
    this.page.setValue(page);
  }

  onNextPage(event: Event) {
    if (this.page.value < this.pages.length) {
      this.page.setValue(this.page.value + 1);
    }
  }

  onPreviousPage(event: Event) {
    if (this.page.value > 1) {
      this.page.setValue(this.page.value - 1);
    }
  }

  onLastPage(event: Event) {
    if (this.page.value !== this.pages.length) {
      this.page.setValue(this.pages.length);
    }
  }

  onFirstPage(event: Event) {
    if (this.page.value !== 1) {
      this.page.setValue(1);
    }
  }

  recalculateScope(current: number) {
    const padding = Math.floor(this.maxPages / 2);
    if (current + padding >= this.pages.length) {
      this.scope[0] = this.pages.length - this.maxPages + 1;
      this.scope[1] = this.pages.length;
    } else if (current - padding <= 1) {
      this.scope[0] = 1;
      this.scope[1] = this.maxPages;
    } else {
      this.scope[0] = current - padding;
      this.scope[1] = current + padding;
    }
  }

  public pageChanged(page: number) {
    if (this.list) {
      const startPos = this.itemsPerPage * (page - 1);
      const endPos = this.itemsPerPage * page;
      this.items = this.list.slice(
        startPos > this.list.length ? 0 : startPos,
        endPos > this.list.length ? this.list.length : endPos
      );
    }
  }
}
