import { Component } from '@angular/core';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, StarRatingComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  rating: number = 1;
  onRatingChanged(newRating: number): void {
    this.rating = newRating;
  }
}

