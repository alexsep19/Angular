import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/delay';
import { CurrencyService } from '../services/currency.service';
import { DialogService } from 'ng2-bootstrap-modal';
import { LogService } from '../services/log.service';
import { NotifyService } from '../services/notify.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { CrudDlgComponent } from './dlg/crud-dlg.component';
import { ICrudDlgModel } from './dlg/iCrudDlgModel';
import { DlgActionEnum } from './dlg/dlg-action.enum';
import { ICurrency } from './iCurrency';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css'],
  providers: [CurrencyService]
})
export class CrudComponent implements OnInit, OnDestroy {
  // rows: ICurrency[] = new Array<ICurrency>();
  rows: ICurrency[] = [];

  columns = [
    { prop: 'id', name: 'ID', draggable: false, resizeable: false, width: 40 },
    { prop: 'code', name: 'Код', draggable: false, resizeable: false, width: 70 },
    { prop: 'strcode', name: 'Символ', draggable: false, resizeable: false, width: 70 },
    { prop: 'name', name: 'Наименование', draggable: false, resizeable: false, width: 200 },
    { prop: 'country', name: 'Страна', draggable: false, resizeable: false, sortable: false, width: 550 }
  ];

  // selected: ICurrency[] = new Array<ICurrency>();
  selected: ICurrency[] = [];

  currencySubscription: Subscription;
  dlgSubscription: Subscription;

  constructor(private currencyService: CurrencyService, private dialogService: DialogService,
    private logService: LogService, private notifyService: NotifyService,
    private loadingService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.load();
  }

  ngOnDestroy() {
    if (this.currencySubscription) {
      this.currencySubscription.unsubscribe();
    }
    if (this.dlgSubscription) {
      this.dlgSubscription.unsubscribe();
    }
  }

  load() {
    this.loadingService.show();

    if (this.currencySubscription) {
      this.currencySubscription.unsubscribe();
    }

    this.currencySubscription = this.currencyService.CurrencyList
      .delay(2000) // fake server delay!!!
      .subscribe((s: ICurrency[]) => {
        this.rows = s;
        this.selected = [s[0]];
        this.loadingService.hide();
      },
      erorr => {
        this.loadingService.hide();
        this.logService.log(erorr);
        this.notifyService.Instance.error('Загрузка', 'Ошибка загрузки. См. лог');
      }
      );
  }

  showDlg(model: ICrudDlgModel) {
    if (this.dlgSubscription) {
      this.dlgSubscription.unsubscribe();
    }

    this.dlgSubscription = this.dialogService.addDialog(CrudDlgComponent, model)
      .subscribe((value: ICrudDlgModel) => this.updateDataTable(value));
  }

  refresh() {
    this.load();
  }

  updateDataTable(value: ICrudDlgModel) {
    if (!value.done) {
      this.logService.log(`Dlg => action: ${DlgActionEnum[value.action]}, done: ${value.done}`);
      return;
    }

    this.logService.warn(`Dlg => action: ${DlgActionEnum[value.action]}, done: ${value.done}\n
    id: ${value.id}, code: ${value.code}, strcode: ${value.strcode}\n
    name: ${value.name}, country: ${value.country}`);

    // Optimistic refresh
    switch (value.action) {
      case DlgActionEnum.New:
        const row: ICurrency = {
          id: value.id, code: value.code, strcode: value.strcode,
          name: value.name, country: value.country
        };
        this.rows = [...this.rows, row];
        this.selected = [this.rows[0]];
        break;
      case DlgActionEnum.Edit:
        const tmp: ICurrency[] = <ICurrency[]>Object.assign([], this.rows);
        const idx = tmp.indexOf(this.selected[0]);
        tmp[idx].name = value.name;
        tmp[idx].code = value.code;
        tmp[idx].strcode = value.strcode;
        tmp[idx].country = value.country;
        this.rows = tmp;
        break;
      case DlgActionEnum.Delete:
        this.rows = this.rows.filter(r => r.id !== value.id);
        if (this.rows.length > 0) {
          this.selected = [this.rows[0]];
        } else {
          this.selected = [];
        }
        break;
    }

    // Pessimistic refresh
    // this.load();
    this.showSuccess(value.action, value.id);
  }

  view() {
    if (this.rows.length === 0) { return; }

    const model: ICrudDlgModel = {
      action: DlgActionEnum.View,
      id: this.selected[0].id,
      code: this.selected[0].code,
      strcode: this.selected[0].strcode,
      name: this.selected[0].name,
      country: this.selected[0].country
    };

    this.showDlg(model);
  }

  add() {
    const model: ICrudDlgModel = { action: DlgActionEnum.New };

    this.showDlg(model);
  }

  edit() {
    if (this.rows.length === 0) { return; }

    const model: ICrudDlgModel = {
      action: DlgActionEnum.Edit,
      id: this.selected[0].id,
      code: this.selected[0].code,
      strcode: this.selected[0].strcode,
      name: this.selected[0].name,
      country: this.selected[0].country
    };

    this.showDlg(model);
  }

  remove() {
    if (this.rows.length === 0) { return; }

    const model: ICrudDlgModel = {
      action: DlgActionEnum.Delete,
      id: this.selected[0].id,
      code: this.selected[0].code,
      strcode: this.selected[0].strcode,
      name: this.selected[0].name,
      country: this.selected[0].country
    };

    this.showDlg(model);
  }

  showSuccess(action: DlgActionEnum, id: number) {
    let title: string;
    let msg: string;
    switch (action) {
      case DlgActionEnum.New:
        title = 'Создание';
        msg = `Создана запись id=${id}`;
        break;
      case DlgActionEnum.Edit:
        title = 'Правка';
        msg = `Исправлена запись id=${id}`;
        break;
      case DlgActionEnum.Delete:
        title = 'Удаление';
        msg = `Удалена запись id=${id}`;
        break;
    }
    this.notifyService.Instance.success(title, msg);
  }
}
