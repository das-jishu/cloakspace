import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';

import { CreatePostComponent } from '../create-post/create-post.component';
import { TagService } from '../services/tag.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrls: ['./main-navbar.component.css'],
})
export class MainNavbarComponent implements OnInit, OnDestroy {
  toggleDark: boolean = false;

  toggleSearch: boolean = false;
  smallScreenToggle: boolean = false;
  searchValue: string;

  hideIconsToggle: boolean;
  showFooter: boolean;

  tags: any[];
  tagSubscription: Subscription;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private tagService: TagService) {

    this.router.events.subscribe(event => {

      if (event instanceof NavigationEnd) {
        const url = event.url;

        if (!url.includes('search'))
          this.onBackArrow();

        if (url === '/' || url === '/about' || url === '/policy' || url === '/contact' || url === '/team') {
          this.showFooter = true;
          this.hideIconsToggle = true;
        }
        else {
          this.showFooter = false;
          this.hideIconsToggle = false;
        }
      }
    });
  }

  ngOnInit(): void {
    this.tagSubscription = this.tagService.getAll()
      .subscribe(tags => this.tags = tags);
  }

  ngOnDestroy(): void {
    this.tagSubscription.unsubscribe();
  }


  openDialog() {
    this.dialog.open(CreatePostComponent, {
      autoFocus: false,
      width: '100%',
      height: '100%',
      maxWidth: '100vw',
      maxHeight: '110vh',
    });
  }

  onToggleSearch() {
    this.toggleSearch = !this.toggleSearch;

    if (window.innerWidth < 768)
      this.smallScreenToggle = true;
  }

  onBackArrow() {
    this.toggleSearch = false;
    this.smallScreenToggle = false;
    this.searchValue = '';
  }

  searchPost(value: string) {
    if (!value || value === '.') return;

    this.router.navigate(['/search'], {
      queryParams: {
        query: value.trim()
      },
      queryParamsHandling: 'merge'
    });
  }

  // applyFilter() {
  //   this.bottomSheet.open(FilterPostsComponent);
  // }


  applyFilter(tag: string) {
    this.router.navigate(['/search'], {
      queryParams: {
        tag: tag
      },
      queryParamsHandling: 'merge'
    });
  }
}
