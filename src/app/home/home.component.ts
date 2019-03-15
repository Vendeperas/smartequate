import { Component, OnInit } from '@angular/core';
declare var require: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  img_home = require('./img_home.png');

  constructor() { }

  ngOnInit() {
  }

}
