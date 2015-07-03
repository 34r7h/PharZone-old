/// <reference path="../../../typings/tsd.d.ts" />

// Angular 2
import {Component, View, Directive, ElementRef, coreDirectives} from 'angular2/angular2';

// App
import {PostService} from '../services/PostService';
import {appDirectives} from '../directives/directives';

// Simple example directive that should be in `/directives` folder

// Simple component
@Component({
	selector: 'deals'
})
@View({
	directives: [coreDirectives, appDirectives],
	template: `


  <div>
    <h2>Deals</h2>
    <input type="text" #ref (keyup)/>
    Search: {{ ref.value }}
    <ul>
	    <span *ng-for="var post of postService.state.posts; var $index = index" >
		    <li *ng-if="post.value == ref.value || ref.value == '' ">
		      <p>
	          {{ post.value + ': $' + post.cost }}        <br>        <i> {{ post.qty + ' @ ' + post.drugForm }} </i>        <small>{{ post.created_at }}</small>
	        </p>
	      </li>
	    <span>
    </ul>
  </div>
  `
})
export class Deals {
	state:any;

	constructor(public postService:PostService) {


	}

}
