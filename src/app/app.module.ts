import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FooterComponent} from "./layout/footer/footer.component";
import {MenuComponent} from "./layout/menu/menu.component";
import {HomeComponent} from './pages/home/home.component';
import {AppState} from "./app.service";
import {MatDialogModule} from "@angular/material/dialog";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {TokenInterceptor} from "./layout/menu/token.interceptor";
import {ProductsComponent} from './pages/products/products.component';
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorIntl, MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorIntlSpanish} from "./MatPaginatorIntlSpanish";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {CreateUpdateComponent} from './pages/products/create-update/create-update.component';
import {NgxMaskDirective} from "ngx-mask";
import {NgxPermissionsModule, NgxPermissionsRestrictStubDirective} from "ngx-permissions";
import {ProductsAdminComponent} from "./pages/products-admin/products-admin.component";


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    MenuComponent,
    HomeComponent,
    ProductsComponent,
    CreateUpdateComponent,
    ProductsAdminComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    NgxMaskDirective,
    NgxPermissionsModule.forRoot(),
    NgxPermissionsRestrictStubDirective
  ],
  providers: [
    AppState, {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,

    },
    {provide: MatPaginatorIntl, useClass: MatPaginatorIntlSpanish},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
