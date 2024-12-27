import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { KitchenComponent } from '../kitchen/kitchen.component';
import { ToastrService } from 'ngx-toastr';

interface Item {
  imageUrl: any;
  itemId: number;
  imageBase64: string;
  itemName: string;
  itemPrice: number;
  image: string;
}

interface Topping {
  toppingId: number;
  toppingName: string;
  toppingPrice: number;
}

interface MenuBucketItem {
  item: Item;
  quantity: number;
  selectedToppings: Topping[];
  itemDisplayName: string;
}

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrl: './mainpage.component.css',
})
export class MainpageComponent {
  menuItems: Item[] = [];
  menuBucket: MenuBucketItem[] = [];
  toppings: Topping[] = [];
  parcelCharges: number = 0;
  extraCharges: number = 0;

  constructor(
    private adminService: AdminService,
    private router: Router,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadItems();
    this.loadToppings();
  }

  // Define the resetOrder method
  resetOrder(): void {
    this.menuBucket = []; // Clear the menu bucket
    this.extraCharges = 0; // Reset extra charges
    this.parcelCharges = 0; // Reset parcel charges
  }

  loadItems(): void {
    this.adminService.getitems().subscribe({
      next: (data) => {
        this.menuItems = data;
      },
      error: (err) => {
        console.error('Error fetching menu items', err);
      },
    });
  }

  loadToppings(): void {
    this.adminService.gettoppings().subscribe({
      next: (data) => {
        // console.log(data);
        this.toppings = data;
      },
      error: (err) => {
        console.log(err);
        console.error('Error fetching toppings', err);
      },
    });
  }

  addToMenuBucket(item: Item): void {
    // Push a new item to the menuBucket regardless of whether it exists
    this.menuBucket.push({
      item,
      quantity: 1,
      selectedToppings: [],
      itemDisplayName: item.itemName,
    });
  }

  updateQuantity(index: number, change: number): void {
    if (this.menuBucket[index].quantity + change > 0) {
      this.menuBucket[index].quantity += change;
    }
  }

  removeFromMenuBucket(index: number): void {
    // Get the total topping price for the item being removed
    const toppingTotal = this.menuBucket[index].selectedToppings.reduce(
      (sum, topping) => sum + topping.toppingPrice,
      0
    );

    // Subtract the topping total from extraCharges
    this.extraCharges -= toppingTotal;

    // Remove the item from the menu bucket
    this.menuBucket.splice(index, 1);
  }

  toggleTopping(bucketIndex: number, topping: Topping): void {
    const selectedToppings = this.menuBucket[bucketIndex].selectedToppings;
    const toppingIndex = selectedToppings.findIndex(
      (t) => t.toppingId === topping.toppingId
    );

    if (toppingIndex > -1) {
      selectedToppings.splice(toppingIndex, 1);
      this.extraCharges -= topping.toppingPrice;
    } else {
      selectedToppings.push(topping);
      this.extraCharges += topping.toppingPrice;
    }

    this.updateItemDisplayName(bucketIndex);
  }

  updateItemDisplayName(bucketIndex: number): void {
    const bucketItem = this.menuBucket[bucketIndex];
    const toppingNames = bucketItem.selectedToppings
      .map((t) => t.toppingName)
      .join(' + ');
    bucketItem.itemDisplayName =
      bucketItem.item.itemName + (toppingNames ? ' + ' + toppingNames : '');
  }

  onParcelChargesChange(event: any): void {
    this.parcelCharges = parseFloat(event.target.value) || 0;
  }

  getSubTotal(): number {
    return this.menuBucket.reduce((total, bucketItem) => {
      const itemTotal = bucketItem.item.itemPrice * bucketItem.quantity;
      const toppingsTotal = bucketItem.selectedToppings.reduce(
        (sum, topping) => sum + topping.toppingPrice,
        0
      );
      return total + itemTotal;
    }, 0);
  }

  getGrandTotal(): number {
    const subTotal = this.getSubTotal();
    return subTotal + this.extraCharges + this.parcelCharges;
  }

  submitOrder(paymentMode: string): void {
    const orderData = {
      saleItemsHelpers: this.menuBucket.map((item) => ({
        item: {
          itemId: item.item.itemId,
          itemName: item.item.itemName,
          itemPrice: item.item.itemPrice,
        },

        toppings: item.selectedToppings.map((topping) => ({
          toppingId: topping.toppingId,

          toppingName: topping.toppingName,
          toppingPrice: topping.toppingPrice,
        })),
        saleQty: item.quantity,
      })),
      subTotal: this.getSubTotal(),
      extraCharges: this.extraCharges,
      parcelCharges: this.parcelCharges,
      finalTotal: this.getGrandTotal(),
      paymentMode: paymentMode,
    };
    if (this.menuBucket.length === 0) {
      this.toast.info('Select Menu');
    } else {
      Swal.fire({
        title: 'Do You Want To Print The Bill?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, print it!',
        cancelButtonText: 'Cancel',

        showCloseButton: true, // Add close (cross) button here
        customClass: {
          closeButton: 'custom-close-button', // Custom class for close button styling
        },
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'The bill is being printed',
            text: 'Please wait while the bill is printed.',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false,
          }).then(() => {
            this.adminService.addsales(orderData).subscribe({
              next: (res) => {
                this.resetOrder();
                this.router.navigate(['/home/bill'], { state: { orderData } }); // Redirect with order data
              },
              error: (err) => {
                Swal.fire({
                  title: 'Error!',
                  text:
                    'Error submitting order: ' +
                    (err.error?.message || 'An unexpected error occurred'),
                  icon: 'error',
                  confirmButtonText: 'OK',
                });
              },
            });
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire({
            title: 'Order Submitted',
            text: 'Your order has been submitted successfully.',
            icon: 'success',
          }).then(() => {
            // Proceed with the order submission
            this.adminService.addsales(orderData).subscribe({
              next: (res) => {
                this.resetOrder();
                this.router.navigate(['/home']);
              },

              error: (err) => {
                Swal.fire({
                  title: 'Error!',
                  text:
                    'Error submitting order: ' +
                    (err.error?.message || 'An unexpected error occurred'),
                  icon: 'error',
                  confirmButtonText: 'OK',
                });
              },
            });
          });
        } else if (result.dismiss === Swal.DismissReason.close) {
          // If close (cross) button is clicked, just close the popup without submitting
          Swal.fire({
            title: 'Something is changing',
            text: 'Customer wants some changes in order',
            icon: 'info',
            timer: 1500,
            showConfirmButton: false,
          });
        }
      });
    }
  }
}
