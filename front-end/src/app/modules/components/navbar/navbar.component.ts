import { Component } from '@angular/core';
import { StorageService } from '../../../auth/services/storage/storage.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  date: string;
  time: string;
  constructor(
    private storage: StorageService,
    private router: Router,
    private toast: ToastrService
  ) {
    // Set current date and time
    const now = new Date();
    this.date = now.toLocaleDateString();
    this.time = now.toLocaleTimeString();
  }

  logout() {
    this.storage.logout();
    this.router.navigate(['/']);
    this.toast.success('Admin logged out successfully.', 'Logged Out');
  }
}
