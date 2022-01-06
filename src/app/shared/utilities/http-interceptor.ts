import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, finalize } from "rxjs/operators";

import { CommonService } from "../services/common.service";

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor(private common: CommonService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.common.activeRequests++;
    return next.handle(req).pipe(
      catchError((err) => {
        this.common.error('Something went wrong! Please try again later');
        return throwError(err);
      }),
      finalize(() => this.common.activeRequests--)
    );
  }
}
