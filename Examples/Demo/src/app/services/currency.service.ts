import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { ICurrency } from '../crud/iCurrency';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class CurrencyService {
  url = 'http://localhost:3000/currency/';  // Json server
  // CRUD: post, get, put | patch, delete


  constructor(private http: HttpClient) { }

  get CurrencyList(): Observable<ICurrency[]> {
    return this.http.get<ICurrency[]>(this.url);
  }

  add(currency: ICurrency): Observable<ICurrency> {
    if (currency.code === '000') {
     return Observable.throw(new Error('Неверный код!'));
     // return Observable.throw(new HttpErrorResponse({error: new Error('Неверный код!')}));
    }

    return this.http.post<ICurrency>(this.url, currency,
       {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  edit(currency: ICurrency): Observable<ICurrency> {
    if (currency.code === '000') {
      return Observable.throw(new Error('Неверный код!'));
    }

    return this.http.put<ICurrency>(this.url + `${currency.id}`, currency,
       {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  delete(currency: ICurrency): Observable<ICurrency> {
    if (currency.code === '643') {
      return Observable.throw(new Error('Нельзя удалять рубль!'));
    }

    return this.http.delete<ICurrency>(this.url + `${currency.id}`);
  }
}


