import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-article-detail',
  template: `
    <app-commentaire></app-commentaire>
  `,
  styles: [
  ]
})
export class ArticleDetailComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
