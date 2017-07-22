import { Component, Input, forwardRef, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { AddLinkComponent } from '../../';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'core-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.scss']
})
export class TopBarComponent {

    @Input() selectedBucketColor: any;

    // forwardRef can help with circular dependency when Nested View Child
    @ViewChild(forwardRef(() => AddLinkComponent)) private addLink: AddLinkComponent;

    constructor(private _router: Router, private _auth: AuthService) {}

    public navigateToHome(): void {
        if (this._auth.isLoggedIn()) this._router.navigate(['/buckets']);
        else this._router.navigate(['/home']);
    }

    public handleCreation($event: any): void {
        console.log('event 0 ', event);
        var currentUrl = $event === 0 ? '/buckets' : $event;
        console.log('event 1 ', event);
        // var refreshUrl = currentUrl.indexOf(myUrl) > -1 ? myUrl : currentUrl;
        // this._router.navigateByUrl(refreshUrl).then(() => this._router.navigateByUrl(currentUrl));
    }

    public focusAddInput(): void {
        this.addLink.focusAddLinkInputElement();
    }

    public getColor() {
        return this.selectedBucketColor;
    }

}
