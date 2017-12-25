import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { ILink } from '../links/links';
import { LogService } from '../services/log.service';


@Injectable()
export class LinksService {

  constructor(private http: HttpClient, private logService: LogService) {
    logService.log('LinksService is created');
  }

  get Links(): Observable<ILink[]> {
    return this.http.get<ILink[]>('assets/data/links.json');
  }
}
