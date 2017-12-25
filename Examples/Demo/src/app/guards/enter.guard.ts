import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EnterPageGuard implements CanActivate {
  canActivate( next: ActivatedRouteSnapshot,
               state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return confirm('Перейти на страницу?');
  }
}
