import { Component, Input } from '@angular/core';

@Component({
  selector: 'core-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent {
  
  private _stepper: number = 0;
  private _maxStep: number = 0;
  private _data: Array<Object> = [];

  @Input() set data(data: Array<Object>) {
    this._data = data;
    this._maxStep = data.length -1;
  };

  private decrementStep() {
    if (this._stepper > 0) {
      this._stepper -= 1;
    }
  }

  private incrementStep() {
    if (this._stepper < this._maxStep) {
      this._stepper += 1;
    }
  }


}