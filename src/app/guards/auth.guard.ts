import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';
import { filter, firstValueFrom, map } from 'rxjs';

export const authGuard: CanActivateFn = async () => {
  const supabaseService = inject(SupabaseService);
  const router = inject(Router);

  // Esperar a que el BehaviorSubject emita al menos una vez (puede ser null)
  // getSession() ya fue llamado en el constructor, así que el BehaviorSubject ya tiene valor
  const session = await firstValueFrom(
    supabaseService.session$.pipe(
      // Tomamos el primer valor que no sea undefined (puede ser null si no hay sesión)
      filter(s => s !== undefined)
    )
  );

  if (session) {
    return true;
  }

  router.navigateByUrl('/login', { replaceUrl: true });
  return false;
};
