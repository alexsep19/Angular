import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ComponentCanDeactivate } from './can-deactivate-component';

@Injectable()
export class ExitPageGuard implements CanDeactivate<ComponentCanDeactivate> {
  canDeactivate(component: ComponentCanDeactivate,
                currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState?: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

        return component.canDeactivate ? component.canDeactivate() : true;
  }
}
