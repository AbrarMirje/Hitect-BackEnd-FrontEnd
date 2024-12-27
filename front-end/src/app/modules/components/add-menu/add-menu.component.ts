import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { ToastrService } from 'ngx-toastr';

interface Item {
  itemId: number;
  itemName: string;
  itemPrice: number;
  image: string;
}

interface Topping {
  toppingId: number;
  toppingName: string;
  toppingPrice: number;
}

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.css'],
})
export class AddMenuComponent implements OnInit{
  imageData: File[] = [];
  addItemForm!: FormGroup;
  addToppingForm!: FormGroup;
  selectedFile: File | null = null;
  items: Item[] = [];
  toppings: Topping[] = [];
  editingItemId: number | null = null;
  editingToppingId: number | null = null;
  showMenu: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private toast: ToastrService
  ) {}


  ngOnInit(): void {
    this.addItemForm = this.formBuilder.group({
      editingItemId: [''],
      itemName: [''],
      itemPrice: [''],
      image: [''],
    });

    this.addToppingForm = this.formBuilder.group({
      toppingId: [''],
      toppingName: [''],
      toppingPrice: [''],
    });

    this.fetchItems();
    this.fetchToppings();
  }

  fetchItems(): void {
    this.adminService.getitems().subscribe((items: Item[]) => {
      this.items = items;
    });
  }

  fetchToppings(): void {
    this.adminService.gettoppings().subscribe((toppings: Topping[]) => {
      this.toppings = toppings;
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedFile = file;
    }
  }

  onAddItem(): void {
    const formData = new FormData();

    if (this.addItemForm.get('itemName')?.value) {
      formData.append('itemName', this.addItemForm.get('itemName')?.value);
    }

    if (this.addItemForm.get('itemPrice')?.value) {
      formData.append(
        'itemPrice',
        this.addItemForm.get('itemPrice')?.value.toString()
      );
    }

    if (this.selectedFile === null) {
      this.toast.error('Choose the item image');
    } else {
      formData.append('image', this.selectedFile);
    }

    if (this.editingItemId !== null) {
      formData.append('itemId', this.editingItemId.toString());
      this.adminService.updateitem(formData).subscribe({
        next: (response) => {
          this.imageData = [];

          this.resetItemForm();
          this.fetchItems();
        },
        error: (err) => {
          console.error('Error updating item', err);
        },
      });
    } else {
      this.adminService.additem(formData).subscribe({
        next: (response) => {
          this.resetItemForm();
          this.fetchItems();
          this.toast.success(
            'New Item has been added to your cafe.',
            'New Item Added.'
          );
        },
        error: (err) => {
          console.error('Error adding item', err);
        },
      });
    }
  }

  onAddTopping() {
    if (this.addToppingForm.valid) {
      const toppingIdControl = this.addToppingForm.get('toppingId');
      const toppingNameControl = this.addToppingForm.get('toppingName');
      const toppingPriceControl = this.addToppingForm.get('toppingPrice');

      if (toppingNameControl && toppingPriceControl && toppingIdControl) {
        const toppingData = {
          toppingId: toppingIdControl.value,
          toppingName: toppingNameControl.value,
          toppingPrice: toppingPriceControl.value,
        };

        if (this.editingToppingId) {
          const formData = new FormData();
          formData.append('toppingId', toppingData.toppingId);
          formData.append('toppingName', toppingData.toppingName);
          formData.append('toppingPrice', toppingData.toppingPrice);

          this.adminService
            .updatetopping(this.editingToppingId, formData)
            .subscribe(
              (response: any) => {
                console.log('Response:', response);

                if (response) {
                  this.resetToppingForm();
                  this.fetchToppings();
                } else {
                  this.toast.warning('Failed to update item');
                }
              },
              (error: any) => {
                console.error('Error:', error);
                this.toast.warning('Failed to update item');
              }
            );
        } else {
          console.log('Adding topping:', toppingData);

          this.adminService.addtopping(toppingData).subscribe(
            (response: any) => {
              console.log('Response:', response);
              if (response) {
                this.resetToppingForm();
                this.fetchToppings();
                this.toast.success(
                  'New Topping has been added to your cafe.',
                  'New Topping Added.'
                );
              } else {
                this.toast.warning('Failed to add item');
              }
            },
            (error: any) => {
              console.error('Error:', error);
              this.toast.warning('Failed to add item');
            }
          );
        }
      }
    }
  }

  // onDeleteItem(item: Item): void {
  //   const confirmMessage = confirm(
  //     'Are you sure you want to delete this item?'
  //   );
  //   if (confirmMessage) {
  //     this.toast.success('Item deleted successfully');
  //     this.adminService.deleteitem(item.itemId).subscribe({
  //       next: () => {
  //         this.items = this.items.filter((i) => i.itemId !== item.itemId);
  //       },
  //       error: (err) => {
  //         console.error('Error deleting item', err);
  //       },
  //     });
  //   }
  // }

  onDeleteItem(item: Item): void {
    this.adminService.deleteitem(item.itemId).subscribe({
      next: () => {
        this.toast.success('Item deleted successfully');
        this.items = this.items.filter((i) => i.itemId !== item.itemId);
      },
      error: () => {
        this.toast.error('Error deleting item');
      },
    });
  }

  onDeleteTopping(topping: Topping): void {
    this.adminService.deletetopping(topping.toppingId).subscribe({
      next: () => {
        this.toast.success('Topping deleted successfully');
        this.toppings = this.toppings.filter(
          (t) => t.toppingId !== topping.toppingId
        );
      },
      error: () => {
        this.toast.error('Error deleting topping');
      },
    });
  }

  onUpdateItem(item: any): void {
    this.editingItemId = item.itemId;
    this.addItemForm.patchValue({
      editingItemId: item.itemId,
      itemName: item.itemName,
      itemPrice: item.itemPrice,
      item: item.imageBase64,
    });
    this.imageData = item.imageBase64;
    this.selectedFile = null;
  }

  onUpdateTopping(topping: Topping): void {
    this.editingToppingId = topping.toppingId;
    this.addToppingForm.patchValue({
      toppingId: topping.toppingId,
      toppingName: topping.toppingName,
      toppingPrice: topping.toppingPrice,
    });
  }

  resetItemForm(): void {
    this.imageData = [];
    this.addItemForm.reset();
    this.addItemForm.reset();
    this.editingItemId = null;
    this.selectedFile = null;
  }

  resetToppingForm(): void {
    this.addToppingForm.reset();
    this.editingToppingId = null;
  }

  toggleView(view: 'menu' | 'topping'): void {
    this.showMenu = view === 'menu';
  }
}
