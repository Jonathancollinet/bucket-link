import { Component, Input, forwardRef, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { AddLinkComponent } from '../../';
import { AuthService } from '../../services/auth.service';
import { SharedService } from '../../services/shared.service';

@Component({
    selector: 'core-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.scss']
})
export class TopBarComponent {

    public selectedBucketColor: any;

    // forwardRef can help with circular dependency when Nested View Child
    @ViewChild(forwardRef(() => AddLinkComponent)) private addLink: AddLinkComponent;

    constructor(
        private _router: Router,
        private _auth: AuthService,
        private _shared: SharedService
    ) {}

    public navigateToHome(): void {
        if (this._auth.isLoggedIn()) this._router.navigate(['/buckets']);
        else this._router.navigate(['/home']);
    }

    public isAuth(): boolean {
        return this._auth.isLoggedIn();
    }

    public handleCreation($event: any): void {
      if (parseInt($event, 10)) {
          if (this._router.url.indexOf('/bucket/') > -1) {
             this._shared.setData('BucketPageShouldBeReloaded', $event);
          } else {
            this._shared.setData('BucketsPageShouldBeReloaded', $event);
          }
          this._shared.setData('BucketsShouldBeReloaded', $event);
      } else {
        this._shared.setData('BucketsShouldBeReloaded', null);
      } 
    }

    public focusAddInput(): void {
        this.addLink.getBucketBorderColor();
        this.addLink.focusAddLinkInputElement();
    }

}
