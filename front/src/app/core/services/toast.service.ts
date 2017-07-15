import {Injectable} from '@angular/core'
import {BehaviorSubject} from "rxjs";
import 'rxjs/add/operator/filter';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';

@Injectable()
export class ToastService {

  public toastSuccessOpt: ToastOptions;
  public toastErrorOpt: ToastOptions;

  constructor(private toastyService:ToastyService, private toastyConfig: ToastyConfig) {
    this.toastyConfig.theme = 'material';
    this.toastSuccessOpt = {
      title: "Success",
      msg: "empty message",
      showClose: true,
      timeout: 3500,
      onAdd: (toast:ToastData) => {
        console.log('Toast ' + toast.id + ' has been added!');
      },
    };
    this.toastErrorOpt = {
      title: "Error",
      msg: "empty message",
      showClose: true,
      timeout: 5000,
    };
  }

  public displaySuccessToast(msg: string, title?: string): void {
    if (title) this.toastSuccessOpt['title'] = title;
    this.toastSuccessOpt['msg'] = msg;
    this.toastyService.success(this.toastSuccessOpt);
  }

  public displayErrorToast(msg: string, title?: string): void {
    if (title) this.toastErrorOpt['title'] = title;
    this.toastErrorOpt['msg'] = msg;
    this.toastyService.error(this.toastErrorOpt);
  }

}
