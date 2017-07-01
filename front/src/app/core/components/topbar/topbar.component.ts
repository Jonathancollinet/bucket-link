import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'core-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.scss']
})

export class TopBarComponent {

    constructor(private _router: Router) {}

    public navigateToBuckets(): void {
        this._router.navigate(['/buckets']);
    }

    public navigateToHome(): void {
        this._router.navigate(['/home']);
    }
        
}