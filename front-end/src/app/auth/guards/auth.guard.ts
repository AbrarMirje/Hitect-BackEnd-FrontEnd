import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { StorageService } from '../services/storage/storage.service';
import { ToastrService } from 'ngx-toastr';

export const AuthGuard: CanActivateFn = (route, state) => {
  const storageService = inject(StorageService);
  const router = inject(Router);
  const toastrService = inject(ToastrService);

  if (
    storageService.getUser() !== null &&
    storageService.getUserRole() == 'COUNTER_ADMIN'
  ) {
    return true;
  }
  toastrService.warning("Session Expired!", "Please login again!")
  router.navigate(['/']);
  return false;
};
