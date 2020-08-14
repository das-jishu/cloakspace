import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Post } from '../models/post';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-full-post',
  templateUrl: './full-post.component.html',
  styleUrls: ['./full-post.component.css'],
})
export class FullPostComponent {
  post: Post;
  isLoading: boolean = true;
  value: string = '';
  showEmoji = false;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe((param) => {
      const uid = param.id;

      this.postService.getPostById(uid).subscribe((post) => {
        if (!post || !Object.keys(post).length) this.router.navigate(['/post']);

        this.post = post;
        this.isLoading = false;
      });
    });
  }

  postComment(v: string) {
    if (v.trim().length) {
      this.postService.addComment(this.post.key, v.trim());
      this.value = '';
    }
  }

  addEmoji(event) {
    this.value += event.emoji.native;
  }

  dragemoji() {
    this.dragElement(document.getElementById("emoji"));
  }

  emojiSelect(event) {
    document.getElementById('emoji').style.top = (event.pageY - 350) + "px";
    this.showEmoji = !this.showEmoji;
    document.getElementById('emoji').style.display = (this.showEmoji === true) ? 'block' : 'none';
    
    this.dragElement(document.getElementById("emoji"));
  }

  dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
      document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
      
    } else {
      elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
}
