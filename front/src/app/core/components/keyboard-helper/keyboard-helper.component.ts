import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'core-keyboard-helper',
  templateUrl: './keyboard-helper.component.html',
  styleUrls: ['./keyboard-helper.component.scss']
})
export class KeyboardHelperComponent {

  public opened: boolean = false;

  constructor(
    private _toast: ToastService
  ) {
  }

  getOpened(): boolean {
    return this.opened;
  }

  setOpened(state): void {
    this.opened = state;
  }



}