import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent {

  @Input('search') search: boolean = false;

  fullPagePostError: boolean = false;

  constructor(private router: Router) {
    const url = this.router.url;

    if (url.includes('post') && !url.includes('feed') && !url.includes('popular') && !url.includes('about') && !url.includes('contact') && !url.includes('team'))
      this.fullPagePostError = true;
    else this.fullPagePostError = false;
  }

}
