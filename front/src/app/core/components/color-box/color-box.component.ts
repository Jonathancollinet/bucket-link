import { Component, Input, Output, EventEmitter } from '@angular/core';

import { BUCKET_COLORS } from '../../const';

@Component({
  selector: 'core-color-box',
  templateUrl: './color-box.component.html',
  styleUrls: ['./color-box.component.scss']
})
export class ColorBoxComponent {

  private _clicked: boolean = false;
  public bucketColors: Array<any> = BUCKET_COLORS;
  public colorChoice: string;

  @Input() defaultColor: string;
  @Output() colorClicked = new EventEmitter();

  constructor() {
    this.colorChoice = this.defaultColor;
  }

  setColor(color): void {
    this.colorClicked.emit(color);
  }

}