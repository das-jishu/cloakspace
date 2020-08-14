import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

import { Post } from '../models/post';
import { AnalyticsService } from '../services/analytics.service';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-recent',
  templateUrl: './recent.component.html',
  styleUrls: ['./recent.component.css']
})
export class RecentComponent implements OnInit {
  posts: Post[];
  isLoading: boolean = true;

  constructor(
    private postService: PostService,
    private analytics: AnalyticsService
  ) {
    this.postService.getAllPosts().pipe(take(1)).subscribe((post) => {
      this.posts = post.reverse();
      this.isLoading = false;

      this.posts.forEach(item => {
        let like = localStorage.getItem('liked' + item.key);
        if (!like) item.liked = "false";
        else item.liked = like;

        let dislike = localStorage.getItem('disliked' + item.key);
        if (!dislike) item.disliked = "false";
        else item.disliked = dislike;
      });
    });
  }

  ngOnInit(): void {
    this.analytics
      .getCurrentPageVisits()
      .pipe(take(1))
      .subscribe((item) => {
        this.analytics.updatePageVisits(item[0]);
      });
  }
}
