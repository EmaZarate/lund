import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-login',
  templateUrl: './error-login.component.html',
  styleUrls: ['./error-login.component.scss']
})
export class ErrorLoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  redirectLogin(){
    this.router.navigate(['login']);
  }

}
