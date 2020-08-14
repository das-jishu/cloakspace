import { Router } from '@angular/router';
import { PostService } from './../services/post.service';
import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post';
import { AnalyticsService } from '../services/analytics.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  posts: Post[];
  isLoading: boolean = true;

  constructor(
    private postService: PostService,
    private analytics: AnalyticsService,
    private route: Router,
  ) {

    this.postService.getAllPosts().pipe(take(1)).subscribe((post) => {
      this.posts = this.shuffle(post);
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

  private shuffle(array) {

    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  showPopular() {
    this.route.navigate(['popular']);
  }

  showRecent() {
    this.route.navigate(['recent']);
  }

  showTrending() {
    let max = 0, key = this.posts[0].key;
    for (let i = 0; i < this.posts.length; i++) {
      if (this.posts[i].totalComments > max && this.daysBetweenDates(this.posts[i].dateCreated, new Date().getTime()) < 5) {
        max = this.posts[i].totalComments;
        key = this.posts[i].key;
      }
    }
    this.route.navigate(['/post', key]);
  }

  daysBetweenDates(d1, d2) {
    var diff = d2 - d1;
    return diff / (1000 * 60 * 60 * 24);
  }

  revisit() {
    location.reload();
  }
}
