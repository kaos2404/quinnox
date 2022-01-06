import { Directive, HostListener } from "@angular/core";

@Directive({
  selector: '[appBack]',
})
export class AppBackDirective {
  @HostListener('click') onClick() {
    window.history.back();
  }
}
