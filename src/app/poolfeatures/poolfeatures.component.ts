import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-poolfeatures',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './poolfeatures.component.html',
  styleUrls: ['./poolfeatures.component.css']
})
export class PoolfeaturesComponent implements AfterViewInit {
  likeCount = 0;
  videoLiked = false;
  videoLoaded = false;
  isPlaying = false;

  @ViewChild('videoPlayer', { static: false }) videoPlayerRef!: ElementRef<HTMLVideoElement>;

  constructor(private translate: TranslateService) {
    // Optional: Set default language or do language switching here
    this.translate.setDefaultLang('en');
  }

  ngAfterViewInit() {
    // You could listen for video events here if needed
  }

  togglePlayPause() {
    const video = this.videoPlayerRef?.nativeElement;
    if (video) {
      if (video.paused || video.ended) {
        video.play();
        this.isPlaying = true;
      } else {
        video.pause();
        this.isPlaying = false;
      }
    }
  }

  onVideoLoad() {
    this.videoLoaded = true;
  }

  infoCards = [
  {
    icon: '/undraw_segment-analysis_cl30.svg',
    iconAlt: 'POOLS.HOW_POOLS_WORK_TITLE',
    title: 'POOLS.HOW_POOLS_WORK_TITLE',
    description: 'POOLS.HOW_POOLS_WORK_DESC',
  },
  {
    icon: '/undraw_journey_brk8.svg',
    iconAlt: 'POOLS.VALUATION_FLEXIBILITY_TITLE',
    title: 'POOLS.VALUATION_FLEXIBILITY_TITLE',
    description: 'POOLS.VALUATION_FLEXIBILITY_DESC',
  },
  {
    icon: '/undraw_control-panel_j1wf.svg',
    iconAlt: 'POOLS.OWNERSHIP_CONTROL_TITLE',
    title: 'POOLS.OWNERSHIP_CONTROL_TITLE',
    description: 'POOLS.OWNERSHIP_CONTROL_DESC',
  },
  {
    icon: '/undraw_contract_upwc.svg',
    iconAlt: 'POOLS.MEMBERSHIP_REQUIREMENT_TITLE',
    title: 'POOLS.MEMBERSHIP_REQUIREMENT_TITLE',
    description: 'POOLS.MEMBERSHIP_REQUIREMENT_DESC',
  },
  {
    icon: '/undraw_check-boxes_ewf2.svg',
    iconAlt: 'POOLS.MEMBER_OPTIONS_TITLE',
    title: 'POOLS.MEMBER_OPTIONS_TITLE',
    description: 'POOLS.MEMBER_OPTIONS_DESC',
  },
];

}
