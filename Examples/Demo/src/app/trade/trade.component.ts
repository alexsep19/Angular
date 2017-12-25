import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/subscription';
import { IStock } from './stock';
import { SocketMessageConfigService, IData } from '../services/socket.message.config.service';
import { StockSocketService } from '../services/stock.socket.service';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.css'],
  providers: [StockSocketService, SocketMessageConfigService]
})
export class TradeComponent implements OnDestroy {

  sample: string[] = ['MCD', 'BA', 'BAC', 'LLY', 'GM', 'GE', 'UAL', 'WMT', 'AAL', 'JPM'];
  symbols: string;
  subscription: Subscription;
  subject: Subject<any>;
  stocks: IStock[];

  constructor(private _stocks: StockSocketService, private _config: SocketMessageConfigService) {
    this.subject = _stocks.create();
    this.subscription = this.subject.subscribe(val => this.stocks = val);
    this._stocks.connect();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  del(stock: IStock) {
    // debugger;
    const data: IData = { message: this._config.CONFIG.unwatchMessageName, data: stock };
    this.subject.next(data);
  }

  add() {
    if (!this.symbols) {
      return;
    }

    const _symbols = this.symbols.replace(/ /g, '');
    const _arr = _symbols.split(',').map(m => m.toUpperCase());

    const data: IData = { message: this._config.CONFIG.watchMessageName, data: _arr };
    this.subject.next(data);
  }
}
