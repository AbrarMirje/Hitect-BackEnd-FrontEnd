import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { StorageService } from '../../../auth/services/storage/storage.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrl: './kitchen.component.css',
})
export class KitchenComponent implements OnInit {
  constructor(
    private storage: StorageService,
    private router: Router,
    private toast: ToastrService,
    private service: AdminService
  ) {}

  orders = [
    {
      billNumber: '',
      itemName: '',
      orderStatus: '',
      quantity: '',
      toppingName: '',
    },
  ];

  items = [
    {
      itemName: '',
    },
  ];

  toppings = [
    {
      toppingName: '',
    },
  ];

  ngOnInit(): void {
    this.service.getPendingOrdersKitchen().subscribe((res) => {
      this.orders = res;
    });

    this.service.getitems().subscribe(
      (res) => {
        if (res !== null) {
          this.items = res;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  logout() {
    this.storage.logout();
    this.router.navigate(['/']);
    this.toast.success('Logged out successfully.', 'Logged Out');
  }

  getLatestOrders() {
    this.ngOnInit();
  }

  orderStatus = {
    sale: {
      saleId: 0,
    },
    item: {
      itemId: 0,
    },
    topping: {
      toppingId: 0,
    },
  };

  done(o: any, i: any) {
    // console.log(o);
    // console.log(i);

    this.orderStatus.item.itemId = i.itemId;
    this.orderStatus.sale.saleId = o.billNumber;
    this.orderStatus.topping.toppingId = o.toppingId;

    this.service.updateOrderStatus(this.orderStatus).subscribe(
      (res) => {
        this.ngOnInit();
      },
      (err) => {
        this.ngOnInit();
      }
    );
  }

  cancel(o: any, i: any) {
    this.orderStatus.item.itemId = i.itemId;
    this.orderStatus.sale.saleId = o.billNumber;
    this.orderStatus.topping.toppingId = o.toppingId;

    this.service.removeOrder(this.orderStatus).subscribe(
      (res) => {
        this.ngOnInit();
      },
      (err) => {
        this.ngOnInit();
      }
    );
  }
}
