import { Component, Input } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { Post } from '../models/post';
import { SharingOptionsComponent } from '../sharing-options/sharing-options.component';
import { PostService } from './../services/post.service';
import { $ } from 'protractor';

@Component({
  selector: 'post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css'],
})
export class PostCardComponent {
  @Input('post') post: Post;
  @Input('route') route: string;

  @Input('searchTerms') searchTerms: string[];
  @Input('insideSearch') insideSearch: boolean;
  h: string;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private bottomSheet: MatBottomSheet,
    private postService: PostService
  ) { }

  viewFullPost(key) {
    this.router.navigate(['/post', key]);
  }

  openSnackBar(action: string, uid?: string) {
    switch (action.toLowerCase()) {
      case 'copy':
        this.snackBar.open('Copied to clipboard!', 'Cool', {
          duration: 3000,
        });
        break;

      case 'report':
        let reported = localStorage.getItem('reported' + uid);
        if (reported) {
          this.snackBar.open(
            'You have already reported this post.',
            'Okay',
            {
              duration: 6000,
            }
          );
        }
        else {
          localStorage.setItem('reported' + uid, 'true');
          this.snackBar.open(
            'This post has been reported. Thanks for bringing it to our concern.',
            'Good',
            {
              duration: 6000,
            }
          );
          this.postService.reportPostById(uid);
        }
        break;

      default: this.snackBar.open('Seems like something went wrong', 'Dismiss');
    }
  }

  openSharingOptions(key: string) {
    this.bottomSheet.open(SharingOptionsComponent, {
      data: { postKey: key },
      backdropClass: 'backdrop',
      restoreFocus: true
    });
  }

  updateLikes(key, event) {
    this.post.liked = (this.post.liked === "true") ? "false" : "true";
    localStorage.setItem('liked' + key, this.post.liked);
    if (this.post.liked === "true") {
      this.postService.updateLike(key, 1);
      this.updateVisibleValues(event, 'likes', 'increase');
      if (this.post.disliked === "true") {
        this.updateDislikes(key, event);
        this.cannotLikeAndDislike();
      }
    }
    else {
      this.postService.updateLike(key, -1);
      this.updateVisibleValues(event, 'likes', 'decrease');
    }
  }

  updateDislikes(key, event) {
    this.post.disliked = (this.post.disliked === "true") ? "false" : "true";
    localStorage.setItem('disliked' + key, this.post.disliked);
    if (this.post.disliked === "true") {
      this.postService.updateDislike(key, 1);
      this.updateVisibleValues(event, 'dislikes', 'increase');
      if (this.post.liked === "true") {
        this.updateLikes(key, event);
        this.cannotLikeAndDislike();
      }
    }
    else {
      this.postService.updateDislike(key, -1);
      this.updateVisibleValues(event, 'dislikes', 'decrease');
    }
  }

  updateVisibleValues(event, str: string, incdec: string) {
    let elementForLikes = event.currentTarget.parentElement.getElementsByClassName('numberlikes')[0];
    let elementForDislikes = event.currentTarget.parentElement.getElementsByClassName('numberdislikes')[0];

    if (str === 'likes') {
      if (incdec === 'increase')
        elementForLikes.innerHTML = ++this.post.likes;
      else
        elementForLikes.innerHTML = --this.post.likes;
    }

    else {
      if (incdec === 'increase')
        elementForDislikes.innerHTML = ++this.post.dislikes;
      else
        elementForDislikes.innerHTML = --this.post.dislikes;
    }
  }

  cannotLikeAndDislike() {
    this.snackBar.open(
      'You cannot like and dislike the same post!',
      'Okay',
      {
        duration: 3000,
      }
    );
  }

  applyFilter(tag) {
    this.router.navigate(['/search'], {
      queryParams: {
        tag: tag
      },
      queryParamsHandling: 'merge'
    });
  }

  checkBlur(key, event) {
    if(!localStorage.getItem('blurred') + key)
    localStorage.setItem('blurred' + key, 'set');
    let x = event.currentTarget.parentElement.parentElement.parentElement.getElementsByClassName('blurred')[0];
    x.style.filter = 'unset';
    x.style.pointerEvents = 'auto';
    let y = event.currentTarget.parentElement.parentElement.parentElement.getElementsByClassName('warnblurred')[0];
    y.style.display = 'none'; 
  }
}
