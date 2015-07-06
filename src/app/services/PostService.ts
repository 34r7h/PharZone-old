/// <reference path="../../../typings/tsd.d.ts" />
import {bind, Inject} from 'angular2/di';
import {Store} from './Store';
// Using TypeScript we can define our state interface
interface IPost {
  value: string;
  cost: number;
  qty: number;
  drugForm: string;
  created_at: Date;
  completed?: boolean;
}
interface IPostState {
  posts: Array<IPost>
}

// We can also make a PostStore to manage cache/localStorage
let initialPostState:IPostState = {
  posts: [
    { value:'Cannabis', created_at: new Date(), cost:24, qty:20, drugForm:'15mg capsules' },
    { value:'LSD', created_at: new Date(), cost:436, qty:220, drugForm:'20mg gelcaps' },
    { value:'DMT', created_at: new Date(), cost:214, qty:622, drugForm:'10mg capsules' },
    { value:'Ayahuasca',  created_at: new Date(), cost:294, qty:128, drugForm:'40mg pills' }
  ],
	fbPosts: []
};

// Our Post Service that uses Store helper class for managing our state
export class PostService extends Store {
  // we shouldn't access ._state or ._setState outside of the class
  constructor(@Inject('initialPostState') state: IPostState) {
    // use Store class as a helper
    super(state);
  }

	fb(){
		var posts = this.get('posts');
		var fbPosts = this.get('fbPosts');
		var myFirebaseRef = new Firebase("https://pharzone.firebaseio.com/drugs");
		console.log('myFirebaseRef', myFirebaseRef);
		myFirebaseRef.on("value", function(snapshot) {
			console.log(snapshot.val(),posts);
			posts = snapshot.val();
			console.log('this.fbPosts',fbPosts);
		}, function (errorObject) {
			console.log("The read failed: " + errorObject.code);
		});

		// Always Replace state
		this.set('posts', posts);
	}
	add(post, cost, drugForm, qty) {
    // Async call to server then save state
    var posts = this.get('posts');
		var myFirebaseRef = new Firebase("https://pharzone.firebaseio.com/");
		var drugs = myFirebaseRef.child('')

		posts.push({
      value: post,
      cost:cost,
      drugForm:drugForm,
      qty:qty,
      created_at: new Date()
    });

    // Always Replace state
    this.set('posts', posts);
  }

  update(index){
    var posts = this.get('posts');
    console.log(posts[index]);
    // Always Replace state
    this.set({
      posts: posts
    });

  }

  remove(index) {
    // Async call to server then save state
    var posts = this.get('posts');
    posts.splice(index, 1);

    // Always Replace state
    this.set({
      posts: posts
    });

  }

}//PostService

export var postInjectables = [
  bind('initialPostState').toValue(initialPostState),
  bind(PostService).toClass(PostService)
];
