import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, filter, map, switchMap, take } from "rxjs/operators";

import { UserService } from "../../shared/services/user.service";
import { User } from "../../shared/types/user";

interface Filter {
  firstName: string;
  lastName: string;
  email: string;
  project: string;
  designation: string;
  search: string;
}

@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class UserListComponent implements OnInit {
  public filteredList: Observable<User[]>;
  public applyFilter: BehaviorSubject<Partial<Filter>>;
  public showFilters: boolean;
  public filters: FormGroup;
  public filter: (users: User[], filters: Filter) => User[];

  constructor(
    private route: ActivatedRoute,
    public service: UserService,
    private router: Router
  ) {
    this.showFilters = false;
    this.filters = new FormGroup({
      firstName: new FormControl(null),
      lastName: new FormControl(null),
      email: new FormControl(null),
      project: new FormControl(null),
      designation: new FormControl(null),
      search: new FormControl(null),
    });

    this.filter = (users: User[], filters: Filter) => {
      let result = users;
      if (users && users.length > 0) {
        if (filters.firstName && filters.firstName.length > 0) {
          result = result.filter(
            (i) =>
              i.firstName &&
              ('' + i.firstName)
                .toLowerCase()
                .includes(filters.firstName.toLowerCase())
          );
        }

        if (filters.lastName && filters.lastName.length > 0) {
          result = result.filter(
            (i) =>
              i.lastName &&
              ('' + i.lastName)
                .toLowerCase()
                .includes(filters.lastName.toLowerCase())
          );
        }

        if (filters.email && filters.email.length > 0) {
          result = result.filter(
            (i) =>
              i.email &&
              ('' + i.email).toLowerCase().includes(filters.email.toLowerCase())
          );
        }

        if (filters.project) {
          result = result.filter(
            (i) => i.project && i.project === filters.project
          );
        }

        if (filters.designation) {
          result = result.filter((i) =>
            filters.designation === 'none'
              ? !i.designation || i.designation.length == 0
              : i.designation && i.designation === filters.designation
          );
        }

        if (filters.search && filters.search.length > 0) {
          result = result.filter(
            (i) =>
              (i.firstName &&
                ('' + i.firstName)
                  .toLowerCase()
                  .includes(filters.search.toLowerCase())) ||
              (i.lastName &&
                ('' + i.lastName)
                  .toLowerCase()
                  .includes(filters.search.toLowerCase())) ||
              (i.email &&
                ('' + i.email)
                  .toLowerCase()
                  .includes(filters.search.toLowerCase())) ||
              (i.project &&
                ('' + i.project)
                  .toLowerCase()
                  .includes(filters.search.toLowerCase())) ||
              (i.designation &&
                ('' + i.designation)
                  .toLowerCase()
                  .includes(filters.search.toLowerCase()))
          );
        }
      }
      return result;
    };

    this.applyFilter = new BehaviorSubject<Partial<Filter>>({});
    this.filteredList = this.applyFilter.pipe(
      switchMap((filters) =>
        this.service.users.pipe(
          take(1),
          map((users) => this.filter(users, filters as Filter)),
          catchError((err) => {
            console.error('Error occured on filtering list', err);
            return of([]);
          })
        )
      )
    );
  }

  ngOnInit(): void {
    this.route.data
      .pipe(
        filter((data) => !!data.users),
        map((data) => data.users)
      )
      .subscribe((users) => {
        this.applyFilter.next({
          firstName: '',
          lastName: '',
          email: '',
          project: '',
          designation: '',
          search: '',
        });
      });
  }

  public onClose() {
    this.showFilters = false;
  }

  public onReset() {
    this.filters.reset();
  }

  public onApply() {
    this.applyFilter.next(this.filters.value);
    this.onClose();
  }
}
