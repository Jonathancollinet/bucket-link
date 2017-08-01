import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'page-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() { }

  handleState(data:any) {
    if (data.r) this.router.navigate(['/buckets']);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

}