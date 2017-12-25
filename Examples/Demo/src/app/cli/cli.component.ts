import { Component, OnInit } from '@angular/core';
import { LogService } from '../services/log.service';
@Component({
  selector: 'app-cli',
  templateUrl: './cli.component.html',
  styleUrls: ['./cli.component.css']
})
export class CliComponent implements OnInit {

  constructor(private logService: LogService) {
    logService.log('CliComponent is created');
   }

  ngOnInit() {
  }

}
