import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'page-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() { }

  handleState(data:any) {
    console.log(data);
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  navigateToForgot() {
    this.router.navigate(['/forgot']);
  }

  debugNavigateToBucket() {
    this.router.navigate(['./buckets'])
  }

}