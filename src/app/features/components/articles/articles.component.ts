import { Component } from '@angular/core';

import { BACKEND } from '../../../shared/environments/backend';
import { GenericService } from '../../../shared/services/generic.service';
import { IArticle } from '../../models/article';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [],
  template: `<h1>articles works</h1>`,
})
export class ArticlesComponent {
  public articles: IArticle[] = [];

  constructor(private articleService: GenericService<IArticle>) {
    this.articleService.setBaseUrl(BACKEND.getArticleBaseApi());
  }

  ngOnInit() {
    this.articleService.getAll().subscribe((response) => {
      this.articles = response;
    });
  }
}
