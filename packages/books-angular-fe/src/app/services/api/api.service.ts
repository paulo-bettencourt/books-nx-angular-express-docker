import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

 
@Injectable()
export class ApiService {

 GET_TODOS = gql`
  query {
    alldays {
      books
      date
      id
    }
  }`
 
  constructor(private apollo: Apollo) {
  }
 
  getData(): any {
    console.log("client ", this.apollo)
    return this.apollo.watchQuery({
      query: this.GET_TODOS
    }).valueChanges.subscribe(({ data, error }: any) => {
      console.log("?AD=F=SAdfkjs")
  }
  );;
  }
}