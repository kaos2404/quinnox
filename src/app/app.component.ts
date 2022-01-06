import { Component } from "@angular/core";

import { CommonService } from "./shared/services/common.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public common: CommonService) {}
}
