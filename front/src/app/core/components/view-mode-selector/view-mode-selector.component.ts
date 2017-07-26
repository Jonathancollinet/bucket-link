import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'core-view-mode-selector',
  templateUrl: './view-mode-selector.component.html',
  styleUrls: ['view-mode-selector.component.scss']
})
export class ViewModeSelectorComponent {

  public viewMode = ['full', 'collapsed', 'list'];
  private _selectedViewMode: string;

  @Output() viewModeUpdate = new EventEmitter();

  @Input() set selectedViewMode(value: string) {
    if (value && value.trim()) {
      this._selectedViewMode = value;
    }
  }

  // Local
  private setSelectedViewMode(idx: number) {
    this._selectedViewMode = this.viewMode[idx];
    this.viewModeUpdate.emit(this._selectedViewMode);
  }
}