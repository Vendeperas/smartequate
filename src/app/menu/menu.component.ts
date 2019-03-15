import { Component, OnInit, AfterViewInit  } from '@angular/core';
import * as anime from 'animejs';
import * as $ from 'jquery';
import { Router, NavigationEnd } from '@angular/router';
declare var require: any;
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, AfterViewInit {

  logo = require('./logo.png');
  line = require('./line.png');
  case = require('./case.png');
  currentUrl: string;
  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe(data => {
     if (data instanceof NavigationEnd) {
      this.currentUrl = window.location.pathname;
     }
    });
  }

  ngAfterViewInit() {
    $('.ml11 .letters').each(function() {
      $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, `<span class='letter'>$&</span>`));
    });

    anime.timeline({loop: false})
      .add({
        targets: '.ml11 .line',
        scaleY: [0, 1],
        opacity: [0.5, 1],
        easing: 'easeOutExpo',
        duration: 700,
        delay: 500
      })
      .add({
        targets: '.ml11 .line',
        translateX: [0, -($('.letters').width() + 37)],
        easing: 'easeOutExpo',
        duration: 700,
        delay: 100
      }).add({
        targets: '.ml11 .letter',
        opacity: [0, 1],
        easing: 'easeOutExpo',
        duration: 600,
        offset: '-=775',
        delay: function(el, i) {
          return 34 * (10 - i);
        }
      }).add({
        targets: '.case',
        scaleY: [0, 1],
        opacity: [0.5, 1],
        easing: 'easeOutExpo',
        duration: 700
      });
  }

}
