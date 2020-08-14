import { PlatformLocation } from '@angular/common';
import { Component, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnDestroy {
  title = 'cloakspace';
  myButton;

  private routeScrollPositions: { [url: string]: number }[] = [];
  private subscriptions: Subscription[] = [];
  private wasPop: boolean = false;
  private previousNavigationUrl: string;

  constructor(private router: Router, private location: PlatformLocation) {
    window.onscroll = function () {
      this.myButton = document.getElementById('myBtn');
      if (
        document.body.scrollTop > 300 ||
        document.documentElement.scrollTop > 300
      ) {
        this.myButton.style.display = 'block';
      } else {
        this.myButton.style.display = 'none';
      }
    };

    history.scrollRestoration = 'manual';

    location.onPopState(() => {
      this.wasPop = true;
    });

    this.subscriptions.push(
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationStart) {
          let currentUrl =
            this.previousNavigationUrl !== null
              ? this.previousNavigationUrl
              : event.url;
          this.routeScrollPositions[currentUrl] = window.pageYOffset;
        } else if (event instanceof NavigationEnd) {
          this.previousNavigationUrl = event.url;

          if (this.wasPop) {
            setTimeout(() => {
              window.scrollTo(0, this.routeScrollPositions[event.url] || 0);
            }, 300);

            this.wasPop = false;
          } else window.scrollTo(0, 0);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}
