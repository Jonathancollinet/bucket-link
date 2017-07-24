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

    constructor(private _router: Router, private _auth: AuthService, private _shared: SharedService) {}

    public navigateToHome(): void {
        if (this._auth.isLoggedIn()) this._router.navigate(['/buckets']);
        else this._router.navigate(['/home']);
    }

    public handleCreation($event: any): void {
        console.log('topbar receive: ', $event);
      if (parseInt($event, 10)) {
          // Navigate to /buckets/:id
          console.log('navigate to bucket/%s ...', $event)
        //   var currentUrl = `/bucket/${$event}`;
        //   var refreshUrl = currentUrl.indexOf(`/bucket/${$event}`) > -1 ? `/bucket/${$event}` : `/bucket/${$event}?t=true`;
        //   this._router.navigateByUrl(refreshUrl).then(() => this._router.navigateByUrl(currentUrl));
          if (this._router.url.indexOf('/bucket/') > -1) {
             this._shared.setData('BucketPageShouldBeReloaded', $event);
          } else {
            this._shared.setData('BucketsPageShouldBeReloaded', $event);
          }
          this._shared.setData('BucketsShouldBeReloaded', $event);
      } else {
         // Navigate to /buckets
         console.log('navigate to buckets ...')
        var currentUrl = `/buckets`;
        var refreshUrl = currentUrl.indexOf(`/buckets`) > -1 ? `/buckets` : `/buckets?t=true`;
        this._router.navigateByUrl(refreshUrl).then(() => this._router.navigateByUrl(currentUrl));
        this._shared.setData('BucketsShouldBeReloaded', null);
      } 
    }

    public focusAddInput(): void {
        this.addLink.getBucketBorderColor();
        this.addLink.focusAddLinkInputElement();
    }

}
