import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { PaginationComponent } from "./components/pagination/pagination.component";
import { AppBackDirective } from "./directives/back.directive";

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  declarations: [
    /* Directives */
    AppBackDirective,

    /* Components */
    PaginationComponent,
  ],
  exports: [
    /* Modules */
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    /* Directives */
    AppBackDirective,

    /* Components */
    PaginationComponent,
  ],
})
export class SharedModule {}
