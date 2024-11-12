import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd, RouterOutlet } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'GDCsoftwareResource-site';

  constructor(private router: Router, private viewportScroller: ViewportScroller) { }

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        
        const fragment = this.router.parseUrl(this.router.url).fragment;
        if (fragment) {
          
          setTimeout(() => {
            this.viewportScroller.scrollToAnchor(fragment);
          }, 0);
        }
      }
    });
  }
}
