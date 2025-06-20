import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  AfterViewInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.services';
import { CommentDialogComponent, CommentEntry } from '../components/comment-dialog-component/comment-dialog-component.component';
import { CommonModule } from '@angular/common';
import { MetalsChartComponent } from '../components/metals-chart/metals-chart.component';


@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [FormsModule, MaterialModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements AfterViewInit {
  likeCount = 0;
  videoLiked = false;
  comments: (CommentEntry & { liked?: boolean; likesCount?: number })[] = [];
  isPlaying = false;

  @ViewChild('commentDialog') commentDialog!: CommentDialogComponent;
  @ViewChild('videoPlayer', { static: false }) videoPlayerRef!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit() {


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
