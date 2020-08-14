import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feed-redirect',
  templateUrl: './feed-redirect.component.html',
  styleUrls: ['./feed-redirect.component.css']
})
export class FeedRedirectComponent {

  constructor(private router: Router) { }

  redirectToFeed() {
    this.router.navigate(['/feed']);
  }

}
