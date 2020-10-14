import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { MovieDataService } from '../movie-data.service';
import {
  NgForm,
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-search-criteria',
  templateUrl: './search-criteria.component.html',
  styleUrls: ['./search-criteria.component.scss'],
})
export class SearchCriteriaComponent implements OnInit {
  feeds;
  moviePosterLink;
  criteria = [];
  genre = [];
  year;

  @Output() submitted = new EventEmitter();
  constructor(private movieDataService: MovieDataService) {}

  ngOnInit(): void {
    this.moviePosterLink = 'https://image.tmdb.org/t/p/w200';
    // this.movieDataService.getMovieData().subscribe((data) => {
    //   console.log('data', data);
    //   this.feeds = data.data;
    // });
  }
  movieSearchSubmit(form: NgForm) {
    this.submitted.emit({
      movieSearch: form.value.movieSearch,
    });
    console.log(form.value.movieSearch);

    this.movieDataService
      .getMovieSearchData(form.value.movieSearch)
      .subscribe((data) => {
        console.log('data', data.results);
        this.feeds = data.results;
      });
  }

  movieSearchFilter() {
    console.log('filter submitted');
    this.movieDataService
      .getMovieFilterData(this.criteria, this.genre, this.year)
      .subscribe((data) => {
        console.log('data', data.results);
        this.feeds = data.results;
      });
  }

  checkedEventCriteria(e) {
    if (e.target.checked) {
      this.criteria.push(e.target.value);
    } else {
      for (var i = 0; i < this.criteria.length; i++) {
        if (this.criteria[i] == e.target.value) {
          this.criteria.splice(i, 1);
        }
      }
    }
    console.log(this.criteria);
  }

  checkedEventGenre(e) {
    if (e.target.checked) {
      this.genre.push(e.target.value);
    } else {
      for (var i = 0; i < this.genre.length; i++) {
        if (this.genre[i] == e.target.value) {
          this.genre.splice(i, 1);
        }
      }
    }
    console.log(this.genre);
  }

  changedYear(e) {
    this.year = e.target.value;
  }
  movieDetail() {}
}