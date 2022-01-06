import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { UserResolver, UsersResolver } from "../shared/resolvers/users.resolver";
import { SharedModule } from "./../shared/shared.module";
import { UserDetailsComponent } from "./details/details.component";
import { UserListComponent } from "./list/list.component";

const routes: Routes = [
  {
    path: 'list',
    component: UserListComponent,
    resolve: {
      users: UsersResolver,
    },
  },
  {
    path: ':id',
    component: UserDetailsComponent,
    resolve: {
      user: UserResolver,
    },
  },
  {
    path: '',
    redirectTo: 'list',
  },
];

@NgModule({
  declarations: [UserListComponent, UserDetailsComponent],
  imports: [RouterModule.forChild(routes), SharedModule],
  exports: [RouterModule],
  providers: [UsersResolver, UserResolver],
})
export class UsersModule {}
