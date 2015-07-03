/// <reference path="../../../typings/tsd.d.ts" />
import {todoInjectables} from './TodoService';
import {postInjectables} from './PostService';

export var appServicesInjectables:Array<any> = [
  todoInjectables, postInjectables
];
