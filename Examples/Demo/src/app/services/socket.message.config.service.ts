import { Injectable } from '@angular/core';

export interface IConfig {
  host: string;
  watchMessageName: string;
  unwatchMessageName: string;
  stocksMessageName: string;
}

export interface IData {
  message: string;
  data: Object;
}

@Injectable()
export class SocketMessageConfigService {
  CONFIG: IConfig = {
    host: 'http://localhost:9000', watchMessageName: 'watch', unwatchMessageName: 'unwatch',
    stocksMessageName: 'stocks'
  };
}
