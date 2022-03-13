import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements OnInit {
  @Input() searchResult: any;
  public panelOpenState = false;
  fromPage!: string;
  fromDialog!: string;
  ratings: any;

  displayedColumns: string[] = ['source', 'value'];

  constructor(
    public dialogRef: MatDialogRef<SearchResultComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public movieData: any
  ) {
    this.ratings = this.movieData['Ratings'];
  }

  ngOnInit(): void {}
  closeDialog() {
    this.dialogRef.close({ event: 'close', data: this.fromDialog });
  }
}
