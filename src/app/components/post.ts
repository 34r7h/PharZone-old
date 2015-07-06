/// <reference path="../../../typings/tsd.d.ts" />

// Angular 2
import {Component, View, Directive, coreDirectives} from 'angular2/angular2';
import {formDirectives, FormBuilder, Control, ControlGroup, Validators} from 'angular2/forms';

// App
import {appDirectives} from '../directives/directives';
import {PostService} from '../services/PostService';



// Simple component
@Component({
	selector: 'post'
})
// <fieldset ng-control-group="posts">
// </fieldset>
@View({
	directives: [coreDirectives, formDirectives, appDirectives],
	template: `
  <form [ng-form-model]="postForm" (submit)="postForm.valid && addPost($event, postForm.value.post, postForm.value.cost, postForm.value.drugForm, postForm.value.qty)"
  novalidate>

    <input type="text" [ng-form-control]="postInput" autofocus required placeholder="Drug Name">
    <input type="text" [ng-form-control]="postDrugForm" autofocus required placeholder="Drug Form">
    <input type="number" [ng-form-control]="postQty" autofocus required placeholder="Drug Qty">
    <input type="number" [ng-form-control]="postCost" autofocus required placeholder="Drug Cost">

    <button>Add Post</button>

    <span class="error-message" *ng-if="
      postForm.errors?.required &&
      postForm.dirty &&
      postForm.controls.post.touched
    ">
      Post is required
    </span>

  </form>

  <ul>
    <li *ng-for="var post of postService.state.posts; var $index = index">
      <p>
        {{ post.value + ': $' + post.cost  }}
        <br>
        <i> {{post.qty + ' @ ' + post.drugForm}} </i>
        <button (click)="removePost($event, $index)">[Remove]</button>
        <button (click)="updatePost($event, $index)">[Update]</button>
        <button (click)="fb()">[Check FB]</button>
        <small>{{ post.created_at }}</small>
      </p>
    </li>
  </ul>
  <h4>All posts</h4>
  <code>{{ fbPosts }}</code>
  `
})
export class Post {
	postForm:ControlGroup;
	postInput:Control;
	postCost:Control;
	postDrugForm:Control;
	postQty:Control;
	state:any;

	constructor(public formBuilder:FormBuilder,
	            public postService:PostService) {

		this.postForm = formBuilder.group({
			'post': ['', Validators.required],
			'cost': ['', Validators.required],
			'drugForm': ['', Validators.required],
			'qty': ['', Validators.required],
		});
		this.postInput = this.postForm.controls.post;
		this.postCost = this.postForm.controls.cost;
		this.postDrugForm = this.postForm.controls.drugForm;
		this.postQty = this.postForm.controls.qty;

	}

	addPost(event, post, cost, drugForm, qty) {
		console.log('addPost arguments', arguments);
		event.preventDefault(); // prevent native page refresh

		this.postService.add(post, cost, drugForm, qty);
		// update the view/model
		this.postInput.updateValue('');
		this.postCost.updateValue('');
		this.postDrugForm.updateValue('');
		this.postQty.updateValue('');
	}

	removePost(event, index) {
		event.preventDefault(); // prevent native page refresh
		this.postService.remove(index);
	}
	fb(){
		this.postService.fb();
	}
	updatePost(event, index) {
		event.preventDefault(); // prevent native page refresh
		this.postService.update(index);
	}

}
