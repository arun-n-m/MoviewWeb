import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ImagePipe } from '../pipes/image.pipe';
import { CommonModule, SlicePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MovieServicesService } from '../services/movie-services.service';

@Component({
  selector: 'app-video',
  imports: [ImagePipe, CommonModule, RouterLink, SlicePipe],
  templateUrl: './video.component.html',
  styleUrl: './video.component.css'
})
export class VideoComponent implements OnInit{
  casts: any[] = [];
  id: number | undefined;
  media_type: string | undefined;
  video: any;
  recommendations: any;
  trailer: any;

  constructor(
    private apiService: MovieServicesService,
    private route: Router,
    private aroute: ActivatedRoute
  ) {
    this.aroute.paramMap.subscribe(params => {
      this.media_type = params.get('media_type')!;
      this.id = params.get('id') ? Number(params.get('id')) : undefined;

      if (this.media_type && this.id) {
        this.fetchMediaDetails();
      }
    });
  }

  private fetchMediaDetails() {
    if (!this.id || !this.media_type) return;
    this.apiService.getMedia(this.id, this.media_type).subscribe((data: any) => {
      this.video = data;
      if (this.video && this.video.production_companies) {
        this.productionCompanies = this.video.production_companies
          .map((p: any) => p.name)
          .join(', ');
      }
    });

    this.apiService.getActors(this.id, this.media_type).subscribe((data: any) => {
      this.casts = data.cast || [];
    });

    this.apiService
      .getRecommentations(this.id, this.media_type)
      .subscribe((data: any) => {
        if (Array.isArray(data.results)) {
          this.recommendations = data.results.slice(0, 10);
        }
      });

    this.apiService.getVideos(this.id, this.media_type).subscribe((data: any) => {
      this.trailer = data.results;
    });
  }

  productionCompanies: string = '';

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  @ViewChild('castContainer') castContainer!: ElementRef;

  scrollLeft() {
    if (this.castContainer?.nativeElement) {
      this.castContainer.nativeElement.scrollBy({ left: 200, behavior: 'smooth' });
    }
  }

  scrollRight() {
    if (this.castContainer?.nativeElement) {
      this.castContainer.nativeElement.scrollBy({ left: -200, behavior: 'smooth' });
    }
  }

  playTrailer() {
    if (this.trailer && this.trailer.length > 0) {
      const id = this.trailer[0].key;
      this.route.navigateByUrl(`player/${id}`);
    }
  }
}
