import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';

import { FeedRedirectComponent } from '../feed-redirect/feed-redirect.component';
import { Post } from '../models/post';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  posts: Post[];
  filteredPosts: Post[];
  isLoading: boolean = true;
  queryParams: any;

  searchTerms: string[];
  insideSearch: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private dialog: MatDialog
  ) {

    combineLatest(
      this.route.queryParams,
      this.postService.getAllPosts()
    ).subscribe(combinedObservable => {

      this.isLoading = true;

      if (Object.keys(combinedObservable[0]).length === 0) {
        this.router.navigate(['/']);
        return;
      }

      this.queryParams = combinedObservable[0];
      this.posts = combinedObservable[1];

      if (this.queryParams.query) {
        this.searchTerms = (<string>this.queryParams.query).split(/\s+/);
        this.insideSearch = true;
      }
      else this.insideSearch = false;

      this.filterPosts(this.queryParams);

      this.isLoading = false;
    });
  }

  clearFilters(action: string) {

    switch (action) {
      case 'query':
        if (this.queryParams.query && !this.queryParams.tag)
          this.dialog.open(FeedRedirectComponent, {
            width: '400px'
          });
        else if (this.queryParams.query && this.queryParams.tag)
          this.router.navigate(['.'], {
            relativeTo: this.route,
            queryParams: {
              query: null
            },
            queryParamsHandling: 'merge'
          });
        this.searchTerms = [];
        break;

      case 'tag':
        if (this.queryParams.tag && !this.queryParams.query)
          this.dialog.open(FeedRedirectComponent, {
            width: '400px'
          });
        else if (this.queryParams.tag && this.queryParams.query)
          this.router.navigate(['.'], {
            relativeTo: this.route,
            queryParams: {
              tag: null
            },
            queryParamsHandling: 'merge'
          });
        break;

      case 'all':
        this.dialog.open(FeedRedirectComponent, {
          width: '400px'
        });
        break;
    }
  }

  private filterPosts({ query, tag }) {

    if (query && tag) {
      this.filteredPosts = this.posts
        .filter(post => post.raw_data.toLowerCase().includes((query as string).trim().toLowerCase()))
        .filter(post => post.tags.includes(tag));
    }

    else if (query)
      this.filteredPosts = this.posts.filter(post => post.raw_data.toLowerCase().includes((query as string).toLowerCase()));

    else if (tag)
      this.filteredPosts = this.posts.filter(post => post.tags.includes(tag));
  }

}
