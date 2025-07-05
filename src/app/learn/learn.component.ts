import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  AfterViewInit,
  ViewChild,
  ElementRef,
  QueryList,
  ViewChildren
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.services';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommentDialogComponent, CommentEntry } from '../components/comment-dialog-component/comment-dialog-component.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-learn',
  standalone: true,
  imports: [FormsModule, MaterialModule, CommonModule, TranslateModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.css']
})
export class LearnComponent implements AfterViewInit {
  likeCount = 0;
  videoLiked = false;
  comments: (CommentEntry & { liked?: boolean; likesCount?: number })[] = [];

  // Track playing state per video by index, initialize all false
  isPlaying: Record<number, boolean> = {
    1: false,
    2: false
  };

  // Query all video players with their refs
  @ViewChildren('videoPlayer1, videoPlayer2') videoPlayers!: QueryList<ElementRef<HTMLVideoElement>>;

  @ViewChild('commentDialog') commentDialog!: CommentDialogComponent;

  constructor(private translate: TranslateService) {
    this.translate.addLangs(['en', 'af']);
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang?.match(/en|af/) ? browserLang : 'en');
  }

  ngAfterViewInit() {
    const script = document.createElement('script');
    script.src = 'https://cdn.lordicon.com/lordicon.js';
    script.async = true;
    document.body.appendChild(script);

    const header = document.getElementById('welcome-header');
    const hasShown = localStorage.getItem('headerShown');

    if (header && !hasShown) {
      header.style.opacity = '0';
      setTimeout(() => {
        header.classList.add('visible');
        localStorage.setItem('headerShown', 'true');
      }, 100);
    } else if (header) {
      header.style.opacity = '1';
    }
  }

  togglePlayPause(videoIndex: number) {
    const videosArray = this.videoPlayers.toArray();
    const currentVideo = videosArray[videoIndex - 1]?.nativeElement;

    if (!currentVideo) return;

    if (currentVideo.paused || currentVideo.ended) {
      // Pause other videos
      videosArray.forEach((videoEl, idx) => {
        if (idx !== videoIndex - 1) {
          videoEl.nativeElement.pause();
          this.isPlaying[idx + 1] = false;
        }
      });

      currentVideo.play();
      this.isPlaying[videoIndex] = true;
    } else {
      currentVideo.pause();
      this.isPlaying[videoIndex] = false;
    }
  }

  onPlay(videoIndex: number) {
    // When user clicks play on a video, pause others
    const videosArray = this.videoPlayers.toArray();

    videosArray.forEach((videoEl, idx) => {
      if (idx !== videoIndex - 1) {
        videoEl.nativeElement.pause();
        this.isPlaying[idx + 1] = false;
      }
    });

    this.isPlaying[videoIndex] = true;
  }

  onPause(videoIndex: number) {
    this.isPlaying[videoIndex] = false;
  }

  likeVideo() {
    this.videoLiked = !this.videoLiked;
    this.videoLiked ? this.likeCount++ : this.likeCount--;
  }

  openCommentsDialog() {
    this.commentDialog.open();
  }

  onNewComment(comment: CommentEntry) {
    this.comments.push({
      ...comment,
      liked: false,
      likesCount: 0
    });
  }

  toggleLike(comment: CommentEntry & { liked?: boolean; likesCount?: number }) {
    if (!comment.likesCount) {
      comment.likesCount = 0;
    }
    comment.liked = !comment.liked;
    comment.likesCount += comment.liked ? 1 : -1;
  }
}
