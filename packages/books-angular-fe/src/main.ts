import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';

import { AppComponent } from './app/app.component';
import { createApollo } from './app/app.config';
import { appRoutes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule, ApolloModule),
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
}).catch((err) =>
  console.error(err)
);
