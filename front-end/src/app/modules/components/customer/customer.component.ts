import {
  AfterContentInit,
  Component,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { AdminService } from '../../services/admin.service';

// Define the Order interface
interface Order {
  billNumber: string;
  itemName: string;
  tempSaleId: number;
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit, AfterContentInit {
  orders: Order[] = [
    {
      billNumber: '',
      itemName: '',
      tempSaleId: 0,
    },
  ];

  orders2 = [
    {
      tempSaleId: 0,
    },
  ];

  pending_orders: any[] = []; // Initialize pending orders array

  constructor(private service: AdminService, private renderer: Renderer2) {}

  ngAfterContentInit(): void {
    this.makeFullscreen();
  }

  makeFullscreen(): void {
    const customerComponent = document.querySelector('app-customer');
    if (customerComponent) {
      // Add the 'fullscreen' class to make the component occupy the full screen
      this.renderer.addClass(customerComponent, 'fullscreen');
    }
  }

  ngOnInit(): void {
    // Fetch completed orders
    this.service.getCustomerCompletedOrders().subscribe((res) => {
      this.orders = res;
      this.orders2 = res;
      this.orders.forEach((order) => {
        this.speakOrderCompletion(order.billNumber); // Speak the completed order
      });
    });

    setTimeout(() => {
      this.orders2.forEach((o) => {
        this.service.deleteTempSaleData(o).subscribe(
          (res) => {
            console.log(res);
            this.ngOnInit(); // Refresh the data after deletion
          },
          (err) => {
            console.log(err);
          }
        );
      });
      window.location.reload(); // Reload page after the timeout
    }, 10000);

    // Fetch pending orders
    this.service.getPendingOrdersKitchen().subscribe(
      (res) => {
        this.pending_orders = res; // Store pending orders
      },
      (err) => {
        console.log(err);
      }
    );
  }

  speakOrderCompletion(billNumber: string): void {
    if (
      'speechSynthesis' in window &&
      typeof SpeechSynthesisUtterance !== 'undefined'
    ) {
      const msg = new SpeechSynthesisUtterance(
        `Please, Pay attention, Order number ${billNumber} is ready to serve.`
      );

      // Get the available voices and try to find an Indian voice
      const voices = speechSynthesis.getVoices();
      if (voices.length) {
        msg.voice =
          voices.find(
            (voice) =>
              voice.lang === 'en-IN' || // Look for Indian English
              voice.name.includes('Indian') || // Look for any voice with 'Indian'
              voice.lang === 'hi-IN' // Hindi voice (optional)
          ) || voices[0]; // Fallback to the first available voice
      }

      // Optional settings for the speech
      msg.volume = 1; // 0 to 1
      msg.rate = 0.6; // 0.1 to 10, adjust for natural pacing
      msg.pitch = 1; // 0 to 2

      // Speak the message
      window.speechSynthesis.speak(msg);
    } else {
      console.error('SpeechSynthesis API is not supported in this browser.');
    }
  }
}
