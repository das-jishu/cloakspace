import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, of, empty } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { Post } from '../models/post';
import { Comment, Replies } from './../models/comment';
import { MailingService } from './mailing.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(
    private db: AngularFireDatabase,
    private mailService: MailingService
  ) {}

  async createPost(post: Post) {
    let d = new Date();
    let date = d.getTime();

    if (post.tags.includes('Depression'))
      this.mailService.sendMailForDepressionTags(post.email);

    if (post.email) this.mailService.addEmailToSubscriptionList(post.email);

    const newPost = await this.db.list('/posts').push({
      dateCreated: date,
      title: post.title,
      body: post.body,
      email: post.email || 'not provided',
      tags: post.tags,
      likes: 0,
      dislikes: 0,
      reports: 0,
      raw_data: post.title + ' ' + post.body + ' ' + d.toDateString(),
    });

    this.mailService.sendNotificationForNewPost({ key: newPost.key, ...post });

    return newPost;
  }

  getAllPosts(): Observable<Post[]> {
    return this.db
      .list('/posts', (ref) => ref.orderByChild('dateCreated'))
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((action) => {
            let t: number = 0;
            if (action.payload.val()['comments']) {
              Object.values(action.payload.val()['comments']).forEach(
                (elem: Comment) => {
                  t +=
                    1 +
                    (elem.replies !== undefined
                      ? Object.keys(elem.replies).length
                      : 0);
                }
              );
            } else t = 0;

            let x, y: string;
            let like = localStorage.getItem('liked' + action.key);
            if (!like) x = 'false';
            else x = like;

            let dislike = localStorage.getItem('disliked' + action.key);
            if (!dislike) y = 'false';
            else y = dislike;

            let bl: string;
            if(action.payload.val()['tags'].includes('NSFW'))
            {
              let blur = localStorage.getItem('blurred' + action.key);
              bl = (blur) ? 'set' : 'unset';
            }

            return <Post>{
              key: action.key,
              title: action.payload.val()['title'],
              dateCreated: action.payload.val()['dateCreated'],
              body: action.payload.val()['body'],
              tags: action.payload.val()['tags'],
              likes: action.payload.val()['likes'],
              dislikes: action.payload.val()['dislikes'],
              comments: action.payload.val()['comments'],
              reports: action.payload.val()['reports'],
              email: action.payload.val()['email'],
              totalComments: t,
              liked: x,
              disliked: y,
              blurred: bl,
              raw_data: action.payload.val()['raw_data'],
            };
          })
        )
      );
  }

  getAllPostsByLikes(): Observable<Post[]> {
    return this.db
      .list('/posts', (ref) => ref.orderByChild('likes'))
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((action) => {
            let t: number = 0;
            if (action.payload.val()['comments']) {
              Object.values(action.payload.val()['comments']).forEach(
                (elem: Comment) => {
                  t +=
                    1 +
                    (elem.replies !== undefined
                      ? Object.keys(elem.replies).length
                      : 0);
                }
              );
            } else t = 0;

            let x, y: string;
            let like = localStorage.getItem('liked' + action.key);
            if (!like) x = 'false';
            else x = like;

            let dislike = localStorage.getItem('disliked' + action.key);
            if (!dislike) y = 'false';
            else y = dislike;

            let bl: string;
            if(action.payload.val()['tags'].includes('NSFW'))
            {
              let blur = localStorage.getItem('blurred' + action.key);
              bl = (blur) ? 'set' : 'unset';
            }

            return <Post>{
              key: action.key,
              title: action.payload.val()['title'],
              dateCreated: action.payload.val()['dateCreated'],
              body: action.payload.val()['body'],
              tags: action.payload.val()['tags'],
              likes: action.payload.val()['likes'],
              dislikes: action.payload.val()['dislikes'],
              comments: action.payload.val()['comments'],
              reports: action.payload.val()['reports'],
              email: action.payload.val()['email'],
              totalComments: t,
              liked: x,
              disliked: y,
              blurred: bl,
              raw_data: action.payload.val()['raw_data'],
            };
          })
        )
      );
  }

  getPostById(uid: string): Observable<Post> {
    return this.db
      .object(`/posts/${uid}`)
      .snapshotChanges()
      .pipe(
        map((action) => {
          if (!action.payload.exists()) return <Post>{};

          let x, y: string;
          let like = localStorage.getItem('liked' + uid);
          if (!like) x = 'false';
          else x = like;

          let dislike = localStorage.getItem('disliked' + uid);
          if (!dislike) y = 'false';
          else y = dislike;

          let bl: string;
          if(action.payload.val()['tags'].includes('NSFW'))
          {
            let blur = localStorage.getItem('blurred' + action.key);
            bl = (blur) ? 'set' : 'unset';
          }

          let t: number = 0;
          if (action.payload.val()['comments']) {
            Object.values(action.payload.val()['comments']).forEach(
              (elem: Comment) => {
                t +=
                  1 +
                  (elem.replies !== undefined
                    ? Object.keys(elem.replies).length
                    : 0);
              }
            );
          } else t = 0;

          return <Post>{
            key: action.key,
            title: action.payload.val()['title'],
            dateCreated: action.payload.val()['dateCreated'],
            body: action.payload.val()['body'],
            tags: action.payload.val()['tags'],
            likes: action.payload.val()['likes'],
            dislikes: action.payload.val()['dislikes'],
            comments: action.payload.val()['comments'],
            reports: action.payload.val()['reports'],
            email: action.payload.val()['email'],
            liked: x,
            disliked: y,
            blurred: bl,
            totalComments: t,
          };
        })
      );
  }

  updateLike(key, change) {
    let currentLikes: number;
    this.getPostById(key)
      .pipe(take(1))
      .subscribe((item) => {
        currentLikes = item.likes;
        this.db.object('/posts/' + key).update({
          likes: currentLikes + change,
        });
      });
  }

  updateDislike(key, change) {
    let currentDislikes: number;
    this.getPostById(key)
      .pipe(take(1))
      .subscribe((item) => {
        currentDislikes = item.dislikes;
        this.db.object('/posts/' + key).update({
          dislikes: currentDislikes + change,
        });
      });
  }

  addComment(key: string, value) {
    this.getPostById(key)
      .pipe(take(1))
      .subscribe((post) => {
        this.mailService.sendNotificationForNewComment(post);

        return this.db.list('/posts/' + key + '/comments').push({
          date: new Date().getTime(),
          text: value,
        });
      });
  }

  addReplies(postkey, commentkey, str) {
    return this.db
      .list('/posts/' + postkey + '/comments/' + commentkey + '/replies')
      .push({
        date: new Date().getTime(),
        text: str,
      });
  }

  getAllComments(key): Observable<Comment[]> {
    return this.db
      .list('/posts/' + key + '/comments', (ref) => ref.orderByChild('date'))
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((action) => {
            let reply: Replies[] = action.payload.val()['replies']
              ? Object.values(action.payload.val()['replies'])
              : [];

            return <Comment>{
              key: action.key,
              text: action.payload.val()['text'],
              date: action.payload.val()['date'],
              replies: reply.reverse(),
            };
          })
        )
      );
  }

  reportPostById(uid: string) {
    this.db.object(`/posts/${uid}/reports`).query.ref.transaction((reports) => {
      if (reports === 10) this.mailService.sendMailForReports(uid);
      return reports + 1;
    });
  }
}
