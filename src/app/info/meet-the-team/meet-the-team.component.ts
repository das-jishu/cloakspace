import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meet-the-team',
  templateUrl: './meet-the-team.component.html',
  styleUrls: ['./meet-the-team.component.css']
})
export class MeetTheTeamComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  contacttubu(str) {
    let link = "";
    switch(str) {
      case 'twitter':
        link = "https://twitter.com/sdotdutta?s=09";
        break;
      case 'github':
        link = "https://github.com/alpha037";
        break;
      case 'facebook':
        link = "https://www.facebook.com/alpha.037";
        break;
      case 'linkedin':
        link = "https://www.linkedin.com/in/shubhranil-dutta-profile";
        break;
      default:
        link = "mailto:subhronil.dutta@gmail.com";
        break;
    }
    window.open(link, '_blank');
  }

  contactnaru(str) {
    let link = "";
    switch(str) {
      case 'twitter':
        link = "https://twitter.com/lord_danton";
        break;
      case 'github':
        link = "https://github.com/das-jishu";
        break;
      case 'facebook':
        link = "https://www.facebook.com/subham.das.39948";
        break;
      case 'linkedin':
        link = "https://www.linkedin.com/in/subham-das-profile";
        break;
      default:
        link = "mailto:das.jishu25@gmail.com";
        break;
    }
    window.open(link, '_blank');
  }

}
