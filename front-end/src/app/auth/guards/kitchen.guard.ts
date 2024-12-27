import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../services/storage/storage.service';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export const kitchenGuard: CanActivateFn = (route, state) => {
  const storageService = inject(StorageService);
  const router = inject(Router);
  const toastrService = inject(ToastrService);

  if (
    storageService.getUser() !== null &&
    storageService.getUserRole() == 'KITCHEN_ADMIN'
  ) {
    return true;
  }
  router.navigate(['/']);
  return false;
};
