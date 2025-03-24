import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent {
  @Input() currentRating: number = 0;
  @Output() ratingChanged = new EventEmitter<number>();

  hoveredRating: number = 0;

  get stars(): number[] {
    return Array(5).fill(0); // tableau de 5 étoiles //
  }

  updateRating(newRating: number): void {
   this.currentRating = this.currentRating === newRating ? newRating - 1 : newRating;
   this.ratingChanged.emit(this.currentRating);
  }

  hoverRating(rating: number): void {
    this.hoveredRating = rating;
  }

  clearHover(): void {
    this.hoveredRating = 0;
  }
}
