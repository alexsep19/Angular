import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';
import { IProduct } from '../feature/directive-demo/iProduct';
import { LogService } from '../services/log.service';


@Injectable()
export class ProductsService {

  constructor(private http: HttpClient, private logService: LogService) {
    logService.log('ProductsService is created');
  }

  get Products(): Observable<IProduct[]> {
    return this.http.get('assets/data/store.json').map(data => {
      const productList: IProduct[] = data['products'];
      return productList.map((p: IProduct) => <IProduct>{ name: p.name, quant: p.quant * this.getRandomInt(1, 30) });
    });
  }

   private getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
