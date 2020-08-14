import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Observable } from 'rxjs';

import { TagService } from '../services/tag.service';
import { Router } from '@angular/router';

@Component({
  selector: 'filter-posts',
  templateUrl: './filter-posts.component.html',
  styleUrls: ['./filter-posts.component.css']
})
export class FilterPostsComponent implements OnInit {

  tags$: Observable<any[]>;

  constructor(
    private tagService: TagService,
    private bottomSheet: MatBottomSheet,
    private router: Router
  ) { }

  async ngOnInit() {
    this.tags$ = await this.tagService.getAll();
  }

  applyFilter(tag: string) {

    this.bottomSheet.dismiss();

    this.router.navigate(['/search'], {
      queryParams: {
        tag: tag
      },
      queryParamsHandling: 'merge'
    });

  }

}
