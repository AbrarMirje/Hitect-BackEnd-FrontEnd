import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/components/home/home.component';
import { NavbarComponent } from './modules/components/navbar/navbar.component';
import { FooterComponent } from './modules/components/footer/footer.component';
import { AddMenuComponent } from './modules/components/add-menu/add-menu.component';
import { ReportComponent } from './modules/components/report/report.component';
import { CounterOrderComponent } from './modules/components/counter-order/counter-order.component';
import { OnlineOrderComponent } from './modules/components/online-order/online-order.component';
import { KitchenComponent } from './modules/components/kitchen/kitchen.component';
import { SignInComponent } from './auth/components/sign-in/sign-in.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { BillComponent } from './modules/components/bill/bill.component';
import { MainpageComponent } from './modules/components/mainpage/mainpage.component';
import { CompletedOrderComponent } from './modules/components/completed-order/completed-order.component';
import { PendingOrderComponent } from './modules/components/pending-order/pending-order.component';
import { CustomerComponent } from './modules/components/customer/customer.component';
import { kitchenGuard } from './auth/guards/kitchen.guard';
import { KitchenHomeComponent } from './modules/components/kitchen-home/kitchen-home.component';

const routes: Routes = [
  { 
    path: '', 
    component: SignInComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: MainpageComponent },
      { path: 'footer', component: FooterComponent },
      { path: 'add-menu', component: AddMenuComponent },
      { path: 'report', component: ReportComponent },
      { path: 'counter-order', component: CounterOrderComponent },
      { path: 'online-order', component: OnlineOrderComponent },
      { path: 'completed-order', component: CompletedOrderComponent },
      { path: 'processing-order', component: PendingOrderComponent },
      { path: 'kitchen', component: KitchenComponent },
      { path: 'bill', component: BillComponent },
    ],
  },

  {
    path: "kitchen-home",
    component: KitchenHomeComponent,
    canActivate: [kitchenGuard],
    children: [
      { path: 'kitchen', component: KitchenComponent },
    ]
  },

  { path: 'customer', component: CustomerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
