/// <reference path="../../../typings/tsd.d.ts" />

// Angular 2
import {Component, View, coreDirectives} from 'angular2/angular2';
import {RouteConfig, RouterOutlet, RouterLink, Router} from 'angular2/router';
import {BrowserLocation} from 'angular2/src/router/browser_location';

// We use a folder if we want separate files
import {Home} from './home/home';
// Otherwise we only use one file for a component
import {Post} from './post';
import {Deals} from './deals';
// A simple example of a Component using a Service
import {Todo} from './todo';


// Import all of our custom app directives
import {appDirectives} from '../directives/directives';

// App: Top Level Component
@Component({
  selector: 'app' // without [ ] means we are selecting the tag directly,
})
@View({
  // needed in order to tell Angular's compiler what's in the template
  directives: [ RouterOutlet, RouterLink, coreDirectives, appDirectives ],
  template: `
  <style>
    .title  { font-family: Arial, Helvetica, sans-serif; }
    .nav    { display: inline; list-style-type: none; padding: 0;  background-color: #F8F8F8; }
    .nav li { display: inline; }
    main    { padding: 0.5em; }
  </style>

  <h1 class="title">Hello {{ name }}</h1>

  <ul class="nav">
    <li><a router-link="home">Home</a></li>
    |
    <li><a router-link="todo">Todo</a></li>
    |
    <li><a router-link="post">Post</a></li>
    |
    <li><a router-link="deals">Deals</a></li>
  </ul>


  <main>
    <router-outlet></router-outlet>
  </main>
  `
})

@RouteConfig([
  { path: '/', as: 'home', component: Home },
  { path: '/deals', as: 'deals', component: Deals },
  { path: '/post', as: 'post', component: Post },
  { path: '/todo', as: 'todo', component: Todo }
])

export class App {
  name: string;
  constructor(router: Router, browserLocation: BrowserLocation) {
    this.name = 'Phar Zone';

    // we need to manually go to the correct uri until the router is fixed
    let uri = browserLocation.path();
    router.navigate(uri);
  }
}
