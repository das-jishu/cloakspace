import { Component } from '@angular/core';
import { TagService } from '../services/tag.service';
import { PostService } from '../services/post.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent {
  tags$;
  post: any = {};
  showEmoj = false;
  value = "";
  value2 = "";

  constructor(
    public _snackBar: MatSnackBar,
    private tagService: TagService,
    private postService: PostService,
    private dialog: MatDialogRef<any>,
    private router: Router
  ) {
    this.tags$ = this.tagService.getAll();
  }

  public get width() {
    return window.innerWidth;
  }

  async save(post) {
    const createdPost = await this.postService.createPost(post);

    this.dialog.close();
    this.openSnackBar('Your post has been created', 'Dismiss');
    this.router.navigate(['/post', createdPost.key]);
  }

  scrollTo(uid) {
    let element = document.getElementById(uid);
    element.scrollIntoView();
    window.scrollTo(0, 0);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
    });
  }

  addEmoji(event) {
    this.value += event.emoji.native;
  }

  addEmoji2(event) {
    this.value2 += event.emoji.native;
  }

  dragemoji() {
    this.dragElement(document.getElementById("emoj"));
  }

  emojiSelect(event) {
    this.showEmoj = !this.showEmoj;
    document.getElementById('emoj').style.display = (this.showEmoj === true) ? 'block' : 'none';
    
    this.dragElement(document.getElementById("emoj"));
  }

  emojiSelect2(event) {
    this.showEmoj = !this.showEmoj;
    document.getElementById('emojs').style.display = (this.showEmoj === true) ? 'block' : 'none';
    
    this.dragElement(document.getElementById("emojs"));
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
