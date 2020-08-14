import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  constructor(private db: AngularFireDatabase) {}

  updatePageVisits(x) {
    this.db.object('/analytics').update({
      noOfPageVisits: x + 1,
    });
  }

  getCurrentPageVisits() {
    return this.db.list('/analytics').valueChanges();
  }
}
