import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'core-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent {

  @Output() forgotRequested = new EventEmitter();

  constructor() {}

}