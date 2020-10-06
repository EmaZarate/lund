import { Component, OnInit } from '@angular/core';
import { DateFormat } from 'src/app/shared/dateFormat';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  constructor() { }

  today : string;

  ngOnInit() {
    this.today = this.getToday();
  }

  getToday() {
    const today = new Date();
    const formatedDate = new DateFormat().format(today);
    return formatedDate;
  }


}
