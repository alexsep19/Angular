import { Injectable } from '@angular/core';
import { NotificationsService } from 'angular4-simple-notifications';

@Injectable()
export class NotifyService {
   constructor(private notificationService: NotificationsService) {
   }

   get Instance(): NotificationsService {
      return this.notificationService;
   }
}
