import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css'],
})
export class BillComponent implements OnInit {
  orderData: any;
  toppings: any;
  invoiceNumber: string;
  date: string;
  time: string;
  menuBucket: any;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.orderData = navigation?.extras.state?.['orderData'];

    this.invoiceNumber = this.generateSequentialInvoiceNumber();

    const now = new Date();
    this.date = now.toLocaleDateString();
    this.time = now.toLocaleTimeString();
  }

  ngOnInit(): void {
    if (!this.orderData) {
      this.router.navigate(['/home']);
    }
  }

  private getTodayDate(): string {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  private generateSequentialInvoiceNumber(): string {
    console.log(this.orderData);
    const todayDate = this.getTodayDate();

    let storedDate = localStorage.getItem('invoiceDate');
    let sequence = localStorage.getItem('invoiceSequence');

    if (!storedDate || storedDate !== todayDate) {
      sequence = '1';
      localStorage.setItem('invoiceDate', todayDate);
    } else {
      sequence = (parseInt(sequence || '0', 10) + 1).toString();
    }

    localStorage.setItem('invoiceSequence', sequence);

    return sequence;
  }

  getName(item: any): string {
    return item.itemName;
  }

  getItemTotal(item: any): number {
    // Calculate the total topping price for this item
    const toppingTotal = item.toppings.reduce(
      (sum: number, topping: any) => sum + topping.toppingPrice,
      0
    );
    // Calculate total for the item (item price * quantity + topping price)
    return item.saleQty * item.item.itemPrice + toppingTotal;
  }

  getTotal(): number {
    // Aggregate the total price for all items including toppings
    return this.orderData.saleItemsHelpers.reduce(
      (sum: number, item: any) => sum + this.getItemTotal(item),
      0
    );
  }

  calculateFinalTotal(): number {
    return this.menuBucket.reduce(
      (
        total: number,
        item: { item: { itemPrice: number }; saleQty: number; toppings: any[] }
      ) => {
        const itemTotal = item.item.itemPrice * item.saleQty;
        const toppingsTotal = item.toppings.reduce(
          (sum: number, topping: any) => sum + topping.toppingPrice,
          0
        );
        return total + itemTotal + toppingsTotal;
      },
      0
    );
  }

  printBill(): void {
    window.print();
  }
}
