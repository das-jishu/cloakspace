import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  constructor(private db: AngularFireDatabase) { }

  getAll() {
    return this.db
      .list('/tags', (ref) => ref.orderByChild('name'))
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((action) => ({
            key: action.key,
            val: action.payload.val(),
          }))
        )
      );
  }

  // For future use
  getTag() { }
}
