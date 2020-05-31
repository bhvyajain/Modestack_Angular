import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, RequiredValidator, Validators, FormControl } from '@angular/forms';

import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  enteredTitle = '';
  enteredbody = '';
  enteredauthor = '';
  post: Post;

  isloading = false;
 private mode = 'create';
 private postId: string;

  constructor(public postsService: PostsService, public route: ActivatedRoute) {}
  ngOnInit() {


}

  

 onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    console.log(form.value);
    this.isloading = true;
    this.postsService.addPost(form.value.title,form.value.body,form.value.author);
    form.reset();

}
}

