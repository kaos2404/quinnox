import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CommonService } from "./shared/services/common.service";
import { UserService } from "./shared/services/user.service";
import { AppInterceptor } from "./shared/utilities/http-interceptor";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true,
    },
    CommonService,
    UserService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
