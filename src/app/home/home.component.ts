import { Component, ElementRef, HostListener, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ImagePipe } from '../pipes/image.pipe';
import { DescriptionPipe } from '../pipes/description.pipe';
import { Router } from '@angular/router';
import { MovieServicesService } from '../services/movie-services.service';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-home',
  imports: [ImagePipe,DescriptionPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  constructor(private router: Router, private api: MovieServicesService) { }
  loader_active: boolean = false
  Trending: any
  upcomming: any
  tvShows: any
  movies: any
  video:any
  ngOnInit(): void {
    this.loader_active = true
    this.api.getMovies().subscribe((data: any) => {
      console.log("getMovies", data);
      this.movies = data.results
      this.loader_active = false
    })
    this.api.getTrendingAll().subscribe((data: any) => {
      this.Trending = data.results;
      this.api.getVideos(this.Trending[0].id,this.Trending[0].media_type ).subscribe((data: any) => {
        this.video = data.results;
      });
    })
    this.api.getAllShows().subscribe((data: any) => {
      this.tvShows = data.results
    })
    this.api.getUpcommingAll().subscribe((data: any) => {
      console.log("getUpcommingAll", data);
      this.upcomming = data.results

    })
  }
  new: any
  movie: any
  getMovie(media_type: string, id: string) {
    const params = `${media_type}/${id}`;
    this.router.navigateByUrl(`/info/${params}`);
  }
  playTrailer() {
    console.log("(click)=playTrailer()");
    const id = this.video[0].key;
    this.router.navigateByUrl(`player/${id}`);
  }
}