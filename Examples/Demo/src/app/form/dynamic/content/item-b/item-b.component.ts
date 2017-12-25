import { Component, Input } from '@angular/core';
import { LogService } from '../../../../services/log.service';
import { IData } from '../../data-interface';

@Component({
  templateUrl: './item-b.component.html',
  styleUrls: ['./item-b.component.css']
})
export class ItemBComponent implements IData {
  @Input()
  data: any;

  constructor(private logService: LogService) {
     logService.log('ItemBComponent is created');
   }
}
