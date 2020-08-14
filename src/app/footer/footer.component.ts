import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AnalyticsService } from '../services/analytics.service';
import { PostService } from '../services/post.service';
import { combineLatest, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  date: number = new Date().getFullYear();
  pageVisits = 0;
  totalLikes = 0;
  totalComments = 0;
  totalPosts = 0;
  isLoading: boolean = true;

  constructor(
    private router: Router,
    private analyticsService: AnalyticsService,
    private postService: PostService) {

    combineLatest(
      this.analyticsService.getCurrentPageVisits(),
      this.postService.getAllPosts()
    ).pipe(take(1)).subscribe(combined => {

      this.pageVisits = <number>combined[0][0];
      this.totalPosts = combined[1].length;
      combined[1].forEach(post => {
        this.totalLikes += post.likes;
        this.totalComments += (post.comments) ? Object.keys(post.comments).length : 0;
      });

      this.isLoading = false;
    });
  }

  navigate(action: string) {
    switch (action) {
      case 'home':
        this.router.navigate(['/']);
        break;

      case 'feed':
        this.router.navigate(['/feed']);
        break;

      case 'about':
        this.router.navigate(['/about']);
        break;

      case 'policy':
        this.router.navigate(['/policy']);
        break;

      case 'team':
      this.router.navigate(['/team']);
      break;

      case 'contact':
        this.router.navigate(['/contact']);
        break;

      default:
        break;
    }
  }

}
