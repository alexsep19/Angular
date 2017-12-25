import { Component } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { LinksService } from '../services/links.service';
import { ILink } from './links';
import { LogService } from '../services/log.service';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.css'],
  providers: [LinksService]
})
export class LinksComponent {
  links: Observable<ILink[]>;

  constructor(private linksService: LinksService, private logService: LogService) {
    logService.log('LinksComponent is created');
    this.links = this.linksService.Links;
   }
}


