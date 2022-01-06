import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { UserService } from "../services/user.service";
import { User } from "../types/user";

@Injectable()
export class UsersResolver implements Resolve<User[]> {
  constructor(private service: UserService) {}

  resolve(): Observable<User[]> {
    return this.service.getUsers();
  }
}

@Injectable()
export class UserResolver implements Resolve<User | null> {
  constructor(private service: UserService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User | null> {
    return this.service
      .getUsers()
      .pipe(
        map(
          (users) => (users || []).find((i) => i.id === route.params.id) || null
        )
      );
  }
}
