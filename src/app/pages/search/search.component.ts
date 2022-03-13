import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SearchMovieService } from 'src/app/services/search-movie.service';
import { SearchResultComponent } from '../search-result/search-result.component';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  public search = '';
  public searchResult: any;
  public years: any = [];
  public selectedYear: any;
  public contentType: any;
  public contentTypes = [
    { value: undefined, view: '' },
    { value: 'movie', view: 'Movie' },
    { value: 'series', view: 'Series' },
    { value: 'episode', view: 'Episode' },
  ];
  constructor(
    public dialog: MatDialog,
    private readonly searchMovieService: SearchMovieService
  ) {}

  @ViewChild('dialogRef')
  dialogRef!: TemplateRef<any>;

  openComp(event: any) {
    if (event.keyCode === 13) {
      this.openCompDialog();
    }
  }
  openCompDialog() {
    const obj = {
      y: this.selectedYear,
      t: this.search,
      type: this.contentType,
    };
    const obj1 = JSON.parse(JSON.stringify(obj));
    this.searchMovieService.getData(obj1).subscribe((result) => {
      const myCompDialog = this.dialog.open(SearchResultComponent, {
        width: '800px',
        data: result,
      });
      myCompDialog.afterClosed().subscribe((res) => {
        // Data back from dialog
        console.log({ res });
      });
    });
  }
  public refresh() {
    this.selectedYear = this.years[0];
  }
  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    this.years.push({ value: undefined, view: '' });
    for (let index = 1940; index < currentYear; index++) {
      this.years.push({ value: index.toString(), view: index.toString() });
    }
  }
}
