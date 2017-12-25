import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/delay';
import { LogService } from '../../services/log.service';
import { ProductsService } from '../../services/products.service';
import { IProduct } from './iProduct';

@Component({
  selector: 'app-directive',
  templateUrl: './directive.component.html',
  styleUrls: ['./directive.component.css'],
  providers: [ProductsService]
})
export class DirectiveComponent implements OnInit {
  loading = false;
  products: Observable<IProduct[]>;

  constructor(private productService: ProductsService, private logService: LogService) {
     logService.log('DirectiveComponent is created');
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.products = this.productService.Products.delay(2000);
  }

}
