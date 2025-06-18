import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-article-detail',
  template: `<app-commentaire></app-commentaire>`,
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
