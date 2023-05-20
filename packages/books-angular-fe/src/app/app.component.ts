import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';

import { NxWelcomeComponent } from './nx-welcome.component';



@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule, CommonModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  
  posts: any[] = [];
  error: any;

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.apollo.watchQuery({
      query: gql`
      query ExampleQuery {
        books {
          title
          author
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

}


