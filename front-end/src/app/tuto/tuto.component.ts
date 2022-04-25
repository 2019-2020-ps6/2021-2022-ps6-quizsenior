import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tuto',
  templateUrl: './tuto.component.html',
  styleUrls: ['./tuto.component.scss']
})
export class TutoComponent implements OnInit {

  public count: number ;

  constructor() {
    this.count = 0;
  }

  ngOnInit(): void {
  }

  upCount(): void {
    this.count++;
  }

  downCount(): void {
    this.count--;
  }

}
