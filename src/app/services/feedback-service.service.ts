import { Feedback } from './../models/feedback';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private db: AngularFireDatabase) { }

  createFeedback(feed: Feedback) {
    return this.db.list('/feedbacks').push({
      title: feed.title,
      body: feed.body,
      dateCreated: new Date().getTime(),
      email: (feed.email) ? feed.email : 'not provided',
    });
  }

  getAllFeedbacks(): Observable<Feedback[]> {
    return this.db
      .list('/feedbacks', (ref) => ref.orderByChild('dateCreated'))
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((action) => {
            return <Feedback>{
              key: action.key,
              title: action.payload.val()['title'],
              dateCreated: action.payload.val()['dateCreated'],
              body: action.payload.val()['body'],
              email: action.payload.val()['email'],
            };
          })
        )
      );
  }
}
