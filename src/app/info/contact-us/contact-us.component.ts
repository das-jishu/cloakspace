import { FeedbackService } from './../../services/feedback-service.service';
import { Feedback } from './../../models/feedback';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  @ViewChild('f') myForm;

  constructor(private feedbackService: FeedbackService,
    public _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  scrollTo(input: HTMLInputElement) {
    input.scrollIntoView();
  }

  save(feed) {
    let x = <Feedback>{
      title: feed.title,
      body: feed.body,
      email: (feed.email) ? feed.email : 'not provided',
    };

    this.feedbackService.createFeedback(x);
    this._snackBar.open("Your feedback has been submitted", "Okay", {
      duration: 6000,
    });

    this.myForm.resetForm();
  }
}
