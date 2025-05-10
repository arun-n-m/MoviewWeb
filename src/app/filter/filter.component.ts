import { Component, EventEmitter, Output } from '@angular/core';
import { MovieServicesService } from '../services/movie-services.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filter',
  imports: [],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {
 constructor(private api: MovieServicesService, private aroute: ActivatedRoute) {
    this.aroute.queryParams.subscribe(params => {
      this.media_type = params['type'];
      if (this.media_type) {
        this.api.getGenres(this.media_type).subscribe((data) => {
          this.selected_language = '';
          this.genres = data;
        });
      }
    });
  }
  
  media_type: any;
  genres: any = { genres: [] };
  selected_language: string = '';
  selected_genres: number = 0;
  active: string = "active";
  
  languages: { code: string; name: string }[] = [
    { code: 'ml', name: 'Malayalam' },
    { code: 'ta', name: 'Tamil' },
    { code: 'hi', name: 'Hindi' },
    { code: 'en', name: 'English' },
    { code: 'ko', name: 'Korean' },
    { code: 'zh', name: 'Chinese' },
    { code: 'fr', name: 'French' },
    { code: 'es', name: 'Spanish' },
    { code: 'ru', name: 'Russian' },
    { code: 'ja', name: 'Japanese' },
  ];
  
  @Output() Genres: EventEmitter<number> = new EventEmitter<number>();
  @Output() Language: EventEmitter<string> = new EventEmitter<string>();

  filterGenres(value: number) {
    if (this.selected_genres !== value) {
      this.selected_genres = value;
      this.Genres.emit(value);
    } else {
      this.selected_genres = 0;
      this.Genres.emit(0);
    }
  }

  filterLanguage(value: string) {
    if (this.selected_language !== value) {
      this.selected_language = value;
      this.Language.emit(value);
    } else {
      this.selected_language = "";
      this.Language.emit("en");
    } 
  }
}
