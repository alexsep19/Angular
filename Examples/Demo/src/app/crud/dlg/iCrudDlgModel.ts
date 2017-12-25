import { DlgActionEnum } from './dlg-action.enum';

export interface ICrudDlgModel {
   action: DlgActionEnum;
   done?: boolean;
   id?: number;
   code?: string;
   strcode?: string;
   name?: string;
   country?: string;
}
