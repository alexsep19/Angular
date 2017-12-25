import { Component, Input } from '@angular/core';
import { LogService } from '../../../../services/log.service';
import { IData } from '../../data-interface';

@Component({
  templateUrl: './item-a.component.html',
  styleUrls: ['./item-a.component.css']
})
export class ItemAComponent implements IData {
  @Input()
  data: any;

  constructor(private logService: LogService) {
    logService.log('ItemAComponent is created');
  }
}
