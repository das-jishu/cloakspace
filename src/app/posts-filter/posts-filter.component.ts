import { Router } from '@angular/router';
import { PostService } from './../services/post.service';
import { Component, OnInit } from '@angular/core';
import { TagService } from '../services/tag.service';

@Component({
  selector: 'posts-filter',
  templateUrl: './posts-filter.component.html',
  styleUrls: ['./posts-filter.component.css']
})
export class PostsFilterComponent implements OnInit {
  tags;
  isLoading: boolean = true;

  constructor(private tagService: TagService, private router: Router) { }

  ngOnInit(): void {
    this.tagService.getAll().subscribe(tags => {
      this.tags = tags;
      this.isLoading = false;
    });
  }

  applyFilter(tag) {
    this.router.navigate(['/search'], {
      queryParams: {
        tag: tag
      },
      queryParamsHandling: 'merge'
    });
  }

}
