import { Component, OnInit } from "@angular/core";
import { NouvArticleComponent } from './../../components/newArticle/nouv-article.component';

@Component({
  selector: "app-new-article",
  template: `<app-nouv-article></app-nouv-article>`,
  styleUrls: ["./new-article.component.scss"],
})
export class NewArticleComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
