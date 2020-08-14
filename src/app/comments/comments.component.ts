import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comment } from './../models/comment';
import { PostService } from './../services/post.service';

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class CommentsComponent {
  @Input('key') key;
  uid: string;
  displayedColumns: string[] = ['icon', 'comments'];
  displayedColumnsVersion: string[] = ['icon', 'comments'];
  dataSource: Comment[];
  comments;
  value: string = '';
  showEmojis = false;

  constructor(private postService: PostService, private route: ActivatedRoute) {
    this.route.params.subscribe((param) => {
      this.uid = param.id;

      this.postService.getAllComments(this.uid).subscribe((comments) => {
        this.comments = comments.reverse();
        this.initializeTable(this.comments);
      });
    });
    
  }

  private initializeTable(comments: Comment[]) {
    this.dataSource = comments;
  }

  addReply(commentKey: string, v: string) {
    if (v.trim().length) {
      this.postService.addReplies(this.uid, commentKey, v.trim());
      this.value = '';
    }
  }

  addEmoji(event) {
    this.value += event.emoji.native;
  }

  dragemoji() {
    this.dragElement(document.getElementById("emojis"));
  }

  emojiSelect(event) {
    document.getElementById('emojis').style.top = (event.pageY - 350) + "px";
    this.showEmojis = !this.showEmojis;
    document.getElementById('emojis').style.display = (this.showEmojis === true) ? 'block' : 'none';
    
    this.dragElement(document.getElementById("emojis"));
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
