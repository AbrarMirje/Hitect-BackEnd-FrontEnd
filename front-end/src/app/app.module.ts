import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './auth/components/sign-in/sign-in.component';
import { NavbarComponent } from './modules/components/navbar/navbar.component';
import { HomeComponent } from './modules/components/home/home.component';
import { FooterComponent } from './modules/components/footer/footer.component';
import { AddMenuComponent } from './modules/components/add-menu/add-menu.component';
import { ReportComponent } from './modules/components/report/report.component';
import { CounterOrderComponent } from './modules/components/counter-order/counter-order.component';
import { OnlineOrderComponent } from './modules/components/online-order/online-order.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { KitchenComponent } from './modules/components/kitchen/kitchen.component';
import { ToastrModule } from 'ngx-toastr';
import { BillComponent } from './modules/components/bill/bill.component';
import { MainpageComponent } from './modules/components/mainpage/mainpage.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CompletedOrderComponent } from './modules/components/completed-order/completed-order.component';
import { PendingOrderComponent } from './modules/components/pending-order/pending-order.component';
import { CustomerComponent } from './modules/components/customer/customer.component';
import { KitchenHomeComponent } from './modules/components/kitchen-home/kitchen-home.component';


@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    AddMenuComponent,
    ReportComponent,
    CounterOrderComponent,
    OnlineOrderComponent,
    KitchenComponent,
    BillComponent,
    MainpageComponent,
    CompletedOrderComponent,
    PendingOrderComponent,
    CustomerComponent,
    KitchenHomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right', 
    }),
    MatTableModule,
    MatInputModule,
    MatDatepickerModule,
    MatCardModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatPaginator,
    MatPaginatorModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}