import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'core-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.scss']
})

export class TopBarComponent {

    private focus: boolean = false;

    constructor(private _router: Router, private _auth: AuthService) {}

    public navigateToHome(): void {
        if (this._auth.isLoggedIn()) this._router.navigate(['/buckets']);
        else this._router.navigate(['/home']);
    }
        
}