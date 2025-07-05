import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  AfterViewInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { MaterialModule } from '../material.services';
import { MetalsChartComponent } from '../components/metals-chart/metals-chart.component';
import { CommentDialogComponent, CommentEntry } from '../components/comment-dialog-component/comment-dialog-component.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    TranslateModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements AfterViewInit {
  likeCount = 0;
  videoLiked = false;
  comments: (CommentEntry & { liked?: boolean; likesCount?: number })[] = [];
  isPlaying = false;
  storyVideoLoaded = false;

  @ViewChild('commentDialog') commentDialog!: CommentDialogComponent;
  @ViewChild('videoPlayer', { static: false }) videoPlayerRef!: ElementRef<HTMLVideoElement>;

  constructor(private translate: TranslateService) {
    // Add available languages
    this.translate.addLangs(['en', 'af']);
    // Set default language
    this.translate.setDefaultLang('en');

    // Optionally detect browser language
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang?.match(/en|af/) ? browserLang : 'en');
  }

  ngAfterViewInit(): void {
    // Handle welcome header animation
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

  // Language switcher method
  switchLang(lang: 'en' | 'af'): void {
    this.translate.use(lang);
  }

  togglePlayPause(): void {
    const video = this.videoPlayerRef?.nativeElement;
    if (video) {
      video.paused || video.ended ? video.play() : video.pause();
    }
  }

  likeVideo(): void {
    this.videoLiked = !this.videoLiked;
    this.videoLiked ? this.likeCount++ : this.likeCount--;
  }

  openCommentsDialog(): void {
    this.commentDialog.open();
  }

  onNewComment(comment: CommentEntry): void {
    this.comments.push({
      ...comment,
      liked: false,
      likesCount: 0
    });
  }

  toggleLike(comment: CommentEntry & { liked?: boolean; likesCount?: number }): void {
    if (!comment.likesCount) {
      comment.likesCount = 0;
    }

    comment.liked = !comment.liked;
    comment.likesCount += comment.liked ? 1 : -1;
  }
}
