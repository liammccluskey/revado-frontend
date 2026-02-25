import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service.service';
import { map, catchError, of } from 'rxjs';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.getIsLoggedIn()) return true;

  if (auth.getToken()) {
    return auth.fetchCurrentUser().pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  router.navigate(['/login']);
  return false;
};
