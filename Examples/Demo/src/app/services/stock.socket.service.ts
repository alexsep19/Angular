import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import * as io from 'socket.io-client';
import { SocketMessageConfigService, IData } from './socket.message.config.service';

@Injectable()
export class StockSocketService {
    private socket;

    constructor(private cfgService: SocketMessageConfigService) {
        this.socket = io(cfgService.CONFIG.host, { autoConnect: false });

        this.socket.on('connect', () => {
            console.log(`Connected  successfully. ID: ${this.socket.id}`);
        });
        this.socket.on('disconnect', (reason) => {
            console.log(`Disconnected successfully. ID: ${this.socket.id} Reason: ${reason}`);
        });
        this.socket.on('connect_error', (error) => {
            console.log(`Connection error: ${error}`);
        });
        this.socket.on('error', (error) => {
            console.log(`Error: ${error}`);
        });

        console.log('StockSocketService is created');
    }

    create(): Subject<any> {
        //  this.socket.open();
        const observable = new Observable(obsrv => {
            this.socket.off(this.cfgService.CONFIG.stocksMessageName);
            this.socket.on(this.cfgService.CONFIG.stocksMessageName, (data) => {
                obsrv.next(data);
                console.log(`Received ${this.cfgService.CONFIG.stocksMessageName} from Websocket Server`);
            });

            return () => {
                this.socket.off(this.cfgService.CONFIG.stocksMessageName);
                this.socket.close();
                console.log('Disconnect from Websocket Server');
            };
        });

        const observer = {
            next: (data: IData) => {
                if (this.socket.connected) {
                    this.socket.emit(data.message, data.data);
                    console.log('Emit...');
                }
            }
        };

        return Subject.create(observer, observable);
    }

    connect() {
        this.socket.open();
    }

    disconnect() {
        this.socket.close();
    }
}
