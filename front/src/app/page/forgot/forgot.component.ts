import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'page-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() { }

  handleState(data:any) {
    console.log(data);
  }

  navigateToLogin() {
    this.router.navigate(['/home']);
  }

}