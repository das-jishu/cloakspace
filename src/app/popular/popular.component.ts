import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { PostService } from '../services/post.service';
import { AnalyticsService } from '../services/analytics.service';
import { Post } from '../models/post';

@Component({
  selector: 'popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.css']
})
export class PopularComponent implements OnInit {
  posts: Post[];
  isLoading: boolean = true;

  constructor(
    private postService: PostService,
    private analytics: AnalyticsService
  ) {
    this.postService.getAllPostsByLikes().pipe(take(1)).subscribe((post) => {
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
