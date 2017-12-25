import { Component } from '@angular/core';
import { LogService } from '../services/log.service';

@Component({
  selector: 'app-architecture',
  templateUrl: './architecture.component.html',
  styleUrls: ['./architecture.component.css']
})
export class ArchitectureComponent {

  constructor(private logService: LogService) {
     logService.log('ArchitectureComponent is created');
  }
}

