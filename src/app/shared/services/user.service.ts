import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { remove, uniq } from "lodash";
import { BehaviorSubject, iif, Observable, of } from "rxjs";
import { catchError, map, switchMap, take, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";

import { User } from "../types/user";

@Injectable()
export class UserService {
  public users: BehaviorSubject<User[]>;
  public projects: Observable<string[]>;
  public designations: Observable<string[]>;
  constructor(private http: HttpClient) {
    this.users = new BehaviorSubject<User[]>([]);

    this.projects = this.users.pipe(
      map((users) =>
        remove(
          uniq(users.map((i) => i.project)),
          (i) => i && i.length > 0
        ).sort()
      )
    );

    this.designations = this.users.pipe(
      map((users) =>
        remove(
          uniq(users.map((i) => i.designation)),
          (i) => i && i.length > 0
        ).sort()
      )
    );
  }

  public getUsers() {
    return this.users.pipe(
      take(1),
      switchMap((users) =>
        iif(() => users && users.length > 0, of(users), this.fetchUsers())
      )
    );
  }

  public fetchUsers() {
    return this.http.get<User[]>(environment.API.users).pipe(
      tap((users) => this.users.next(users)),
      catchError((err) => {
        console.error('Error on fetching user list', err);
        return of([]);
      })
    );
  }
}
