import { Component, OnInit} from '@angular/core';
import { LogService } from '../services/log.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor(private logService: LogService) {
     logService.log('FormComponent is created');
   }

  ngOnInit() {
  }

}
