import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface CommentEntry {
  name: string;
  surname: string;
  membership: 'Member' | 'Not a Member';
  text: string;
  liked?: boolean;
  likesCount?: number;
}

@Component({
  selector: 'app-comment-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comment-dialog-component.component.html',
  styleUrls: ['./comment-dialog-component.component.css']
})
export class CommentDialogComponent {
  @Input() comments: CommentEntry[] = [];
  @Output() newCommentAdded = new EventEmitter<CommentEntry>();

  newComment = '';
  firstName = '';
  surname = '';
  membership: 'Member' | 'Not a Member' | '' = '';
  isVisible = false;
  isSubmitting = false;

  open(): void {
    this.isVisible = true;
  }

  close(): void {
    this.isVisible = false;
  }

  addComment(): void {
    if (this.isSubmitting) return;

    if (
      this.newComment.trim() &&
      this.firstName.trim() &&
      this.surname.trim() &&
      this.membership
    ) {
      this.isSubmitting = true;

      const comment: CommentEntry = {
        name: this.firstName.trim(),
        surname: this.surname.trim(),
        membership: this.membership,
        text: this.newComment.trim(),
        liked: false,
        likesCount: 0
      };

      this.newCommentAdded.emit(comment);

      // Reset form fields
      this.newComment = '';
      this.firstName = '';
      this.surname = '';
      this.membership = '';

      this.isSubmitting = false;

      this.close();
    }
  }

  toggleLike(comment: CommentEntry): void {
    if (!('liked' in comment)) comment.liked = false;
    if (!('likesCount' in comment)) comment.likesCount = 0;

    comment.liked = !comment.liked;
    comment.likesCount = (comment.likesCount || 0) + (comment.liked ? 1 : -1);
  }
}
