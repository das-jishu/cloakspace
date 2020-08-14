import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, Inject } from '@angular/core';
import { MatBottomSheet, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { DeviceDetectorService } from "ngx-device-detector";

@Component({
  selector: 'app-sharing-options',
  templateUrl: './sharing-options.component.html',
  styleUrls: ['./sharing-options.component.css'],
})
export class SharingOptionsComponent {

  constructor(
    private bottomSheet: MatBottomSheet,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private _snackbar: MatSnackBar,
    private deviceService: DeviceDetectorService) { }

  share(media: string) {
    this.bottomSheet.dismiss();
    // console.log(this.data.postKey);
    let link = 'https://cloakspace.tech/post/' + this.data.postKey;
    link = encodeURIComponent(link);
    let share = "";

    switch (media) {
      case 'whatsapp':
        if (this.deviceService.isMobile())
          share = "https://wa.me/?text=" + link;
        else if (this.deviceService.isDesktop()
          || this.deviceService.isTablet())
          share = "https://web.whatsapp.com/send?text=" + link;
        break;

      case 'twitter':
        share = 'https://twitter.com/intent/tweet?text=' + link;
        break;

      case 'facebook':
        share = "http://www.facebook.com/sharer/sharer.php?u=" + link + "&t=" + encodeURIComponent('Check out this post!');
        break;

      case 'mail':
        share = "mailto:?body=" + link;
        break;

      default:
        this._snackbar.open('Seems to be some sort of problem. Try again later!', 'Okay', {
          duration: 5000,
        });
    }

    window.open(share, '_blank');
  }
}
