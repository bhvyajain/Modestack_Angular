import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Post ,Post1} from './post.model';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<{posts: Post[], postCount: number}>();

  constructor(private http: HttpClient, private router: Router) {}

  getPosts(postperchange: number, currentpage: number) {
    const queryParams = `?pageSize=${postperchange}&page=${currentpage}`;
    this.http
      .get<{ message: string; posts: any, maxPosts: number }>(
        'http://localhost:8030/articles' + queryParams)
      // ).subscribe(d=>{
      //   console.log(d);
      // }
      //   )
      .pipe(map((postData) => {
        return {posts: postData.posts.map(post => {
          console.log('first',post);
          return {
            title: post.title,
            body: post.body,
            id: post._id,
           author: post.author
          };
        }), maxPosts: postData.maxPosts};
      }))
      .subscribe(transformedPostsData => {
        console.log(transformedPostsData);
        console.log('talk');
      this.posts = transformedPostsData.posts;
      console.log([...this.posts]);
     this.postsUpdated.next({posts: [...this.posts], postCount: transformedPostsData.maxPosts});
     console.log('end');
      });
    
 }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    return this.http.get<{_id: string, title: string, body: string, author: string}>('http://localhost:8030/articles/' + id);
  }

  addPost(title: string, body: string, author: string) {
   const postData : Post1 ={title: title,content:body,author: author};
   console.log(postData);
   this.http
      .post<{ message: string, post: Post }>('http://localhost:8030/articles', postData)
      .subscribe(responseData => {
         this.router.navigate(['/']);
      });
  }      


}

