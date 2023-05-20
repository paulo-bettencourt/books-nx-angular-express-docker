import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';

import { NxWelcomeComponent } from './nx-welcome.component';



@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule, CommonModule, FormsModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  
  posts: any[] = [];
  error: any;

  isYear = false;
  isTitle = false;
  isAuthor = false;

  year = '';
  title = '';
  author = '';

  constructor(private apollo: Apollo) { }
  
  queryBooksWithGraphQl(year = this.year, title = this.title, author = this.author) {
    this.apollo.watchQuery({
      query: gql`
      query ExampleQuery {
        books {
          ${year ? 'year' : ''}
          ${title ? 'title' : ''}
          ${author ? 'author' : ''}
        }
      }      
      `
    }).valueChanges.subscribe(({ data, error }: any) => {
      this.posts = data.books;
      this.error = error;
      console.log("POSTS -> ", data)
    }
    );
  }

  submit() {
    this.updateValuesFromCheckbox();
    this.queryBooksWithGraphQl(this.year, this.author, this.title)
  }

  updateValuesFromCheckbox() {
    this.isYear === true ? this.year = 'year' : this.year = '';
    this.isAuthor === true ? this.author = 'author' : this.author = '';
    this.isTitle === true ? this.title = 'title' : this.title = '';

  }

}


