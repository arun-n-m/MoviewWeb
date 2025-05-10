import { Component } from '@angular/core';
import { FilterComponent } from '../filter/filter.component';
import { ImagePipe } from '../pipes/image.pipe';
import { TitlePipe } from '../pipes/title.pipe';
import { LoaderComponent } from '../loader/loader.component';
import { MovieServicesService } from '../services/movie-services.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-browser',
  imports: [FilterComponent,ImagePipe,TitlePipe,LoaderComponent],
  templateUrl: './browser.component.html',
  styleUrl: './browser.component.css'
})
export class BrowserComponent {

  constructor(
    private apiService: MovieServicesService,
    private route: Router,
    private aroute: ActivatedRoute
  ) {
    this.aroute.queryParams.subscribe(params => {
      this.media_type = params['type'];
      if (this.media_type) {
        this.apiService.getAllMedia(this.page, this.language_code, this.media_type).subscribe((data: any) => {
          this.allMedia = data.results;
        });
      }
    });
  }

  allMedia: any;
  media_type: any;
  page: number = 1;
  genres_type: number = 0;
  language_code: string = 'en';
  
  getMovie(id: string) {
    this.route.navigateByUrl(`info/${this.media_type}/${id}`);
  }

  genres(value: number) {
    this.genres_type = value;
    this.page = 1;
    this.apiService
      .getAllMediaByGenresAndLanguage(
        this.media_type,
        value,
        this.page,
        this.language_code
      )
      .subscribe((data: any) => {
        this.allMedia = data.results;
      });
  }

  language(value: string) {
    this.language_code = value;
    this.page = 1;
    this.apiService
      .getAllMediaByGenresAndLanguage(
        this.media_type,
        this.genres_type,
        this.page,
        this.language_code
      )
      .subscribe((data: any) => {
        this.allMedia = data.results;
      });
  }

  loadMore() {
    this.page++;
    if (this.genres_type) {
      this.apiService
        .getAllMediaByGenresAndLanguage(
          this.media_type,
          this.genres_type,
          this.page,
          this.language_code
        )
        .subscribe((data: any) => {
          const newResults = data.results.filter(
            (newItem: any) => !this.allMedia.some((existingItem: any) => existingItem.id === newItem.id)
          );
          this.allMedia = [...this.allMedia, ...newResults];
        });
    } else {
      this.apiService
        .getAllMedia(this.page, this.language_code, this.media_type)
        .subscribe((data: any) => {
          const newResults = data.results.filter(
            (newItem: any) => !this.allMedia.some((existingItem: any) => existingItem.id === newItem.id)
          );
          this.allMedia = [...this.allMedia, ...newResults];
        });
    }
  }
}
