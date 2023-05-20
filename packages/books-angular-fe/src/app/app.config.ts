import { ApplicationConfig } from '@angular/core';
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';
import { InMemoryCache } from '@apollo/client/cache';
import { ApolloClientOptions } from '@apollo/client/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';

import { appRoutes } from './app.routes';

const uri = 'http://localhost:4000/graphql';

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  return {
    link: httpLink.create({ uri }),
    cache: new InMemoryCache(),
  };
}

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
  
};
