import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

import { Post } from '../models/post';
import { AnalyticsService } from './../services/analytics.service';
import { PostService } from './../services/post.service';

@Component({
  selector: 'trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.css'],
})
export class TrendingComponent implements OnInit {
  posts: Post[];
  totalPosts = 0;
  totalPageVisits = 0;

  hasLoaded: boolean = false;

  constructor(
    private router: Router,
    private postService: PostService,
    private analyticsService: AnalyticsService
  ) {
    this.postService.getAllPosts().subscribe((post) => {
      this.posts = post.reverse();
      this.totalPosts = this.posts.length;

      this.posts.forEach((item) => {
        let like = localStorage.getItem('liked' + item.key);
        if (!like) item.liked = 'false';
        else item.liked = like;

        let dislike = localStorage.getItem('disliked' + item.key);
        if (!dislike) item.disliked = 'false';
        else item.disliked = dislike;
      });
    });
  }

  ngOnInit(): void {
    this.analyticsService
      .getCurrentPageVisits()
      .pipe(take(1))
      .subscribe((x) => {
        this.totalPageVisits = <number>x[0];
      });
  }

  showPopular() {
    this.router.navigate(['popular']);
  }

  showTrending() {
    let max = 0,
      key = this.posts[0].key;
    for (let i = 0; i < this.posts.length; i++) {
      if (
        this.daysBetweenDates(this.posts[i].dateCreated, new Date().getTime()) >
        5
      )
        break;

      if (this.posts[i].totalComments > max) {
        max = this.posts[i].totalComments;
        key = this.posts[i].key;
      }
    }
    this.router.navigate(['/post', key]);
  }

  daysBetweenDates(d1, d2) {
    let diff = d2 - d1;
    return diff / (1000 * 60 * 60 * 24);
  }

  showRecent() {
    this.router.navigate(['recent']);
  }
}
