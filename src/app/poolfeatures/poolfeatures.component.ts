import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-poolfeatures',
  imports: [CommonModule],
  templateUrl: './poolfeatures.component.html',
  styleUrl: './poolfeatures.component.css'
})
export class PoolfeaturesComponent {
   likeCount = 0;
    videoLiked = false;

    videoLoaded = false;
    isPlaying = false;

   @ViewChild('videoPlayer', { static: false }) videoPlayerRef!: ElementRef<HTMLVideoElement>;

  togglePlayPause() {
    const video = this.videoPlayerRef?.nativeElement;
    if (video) {
      if (video.paused || video.ended) {
        video.play();
      } else {
        video.pause();
      }
    }
  }
}
