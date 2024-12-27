import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent {
  @Input() orderData: any; // This will hold the order data passed from the parent
  @Input() invoiceNumber: string = '';
  @Input() date: string = '';
  @Input() time: string = '';

  /**
   * Calculate the total cost for a specific item.
   * @param item The item for which to calculate the total cost.
   * @returns The total cost for the item.
   */
  getItemTotal(item: any): number {
    return item.saleQty * item.item.itemPrice;
  }

  /**
   * Calculate the total amount for the order.
   * @returns The total cost of all items in the order.
   */
  getTotal(): number {
    return this.orderData.saleItemsHelpers.reduce(
  
      (total: number, item: any) => total + this.getItemTotal(item),
      0
    );
  }

  /**
   * Print the bill. This method will trigger the browser's print functionality.
   */
  printBill(): void {
    window.print();
  }
}
