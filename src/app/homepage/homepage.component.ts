import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { MaterialModule } from '../material.services';
import { MetalsChartComponent } from '../components/metals-chart/metals-chart.component';
import { CommentDialogComponent, CommentEntry } from '../components/comment-dialog-component/comment-dialog-component.component';
import { LanguageService } from '../services/language.service';

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
export class HomepageComponent implements AfterViewInit, OnInit {
  likeCount = 0;
  videoLiked = false;
  comments: (CommentEntry & { liked?: boolean; likesCount?: number })[] = [];
  isPlaying = false;
  storyVideoLoaded = false;
  public promoVisible = true;

  @ViewChild('commentDialog') commentDialog!: CommentDialogComponent;
  @ViewChild('videoPlayer', { static: false }) videoPlayerRef!: ElementRef<HTMLVideoElement>;

  constructor(private languageService: LanguageService) {
    // ✅ Use persisted or default language on init
    const lang = this.languageService.getCurrentLanguage();
    this.languageService.useLanguage(lang);
  }

  ngOnInit(): void {
    const hasSeenPromo = localStorage.getItem('promoShown');
    if (!hasSeenPromo) {
      this.promoVisible = true;
      setTimeout(() => {
        this.promoVisible = false;
        localStorage.setItem('promoShown', 'true');
      }, 6000);
    } else {
      this.promoVisible = false;
    }
  }

  ngAfterViewInit(): void {
    // 👋 Welcome header animation
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

  // 🌐 Language switcher that persists selection
  switchLang(lang: 'en' | 'af'): void {
    this.languageService.useLanguage(lang);
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
