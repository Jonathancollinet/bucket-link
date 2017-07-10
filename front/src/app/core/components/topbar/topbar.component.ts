import { Component, forwardRef, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { AddLinkComponent } from '../../';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'core-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.scss']
})
export class TopBarComponent {

    // forwardRef can help with circular dependency when Nested View Child
    @ViewChild(forwardRef(() => AddLinkComponent)) private addLink: AddLinkComponent;

    constructor(private _router: Router, private _auth: AuthService) {}

    public navigateToHome(): void {
        if (this._auth.isLoggedIn()) this._router.navigate(['/buckets']);
        else this._router.navigate(['/home']);
    }

    public handleCreation(): void {

    }

    public focusAddInput(): void {
        this.addLink.focusAddLinkInputElement();
    }

}
