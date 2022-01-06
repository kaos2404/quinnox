import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";

import { CommonService } from "../services/common.service";

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor(private common: CommonService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.common.activeRequests++;
    return next.handle(req).pipe(finalize(() => this.common.activeRequests--));
  }
}
