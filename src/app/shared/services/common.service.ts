import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class CommonService {
  public activeRequests = 0;

  constructor(private toastr: ToastrService) {}

  public success(msg: string) {
    this.toastr.success(msg, '', {
      timeOut: 4000,
      positionClass: 'toast-bottom-right',
    });
  }

  public error(msg: string) {
    this.toastr.error(msg, '', {
      timeOut: 4000,
      positionClass: 'toast-bottom-right',
    });
  }
}
