import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material';
import { Post,Post2 } from '../post.model';
import { PostsService } from '../posts.service';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts = [];
  view = [];
  totalPost = 0;
  private postsSub: Subscription;
 isloading = false;
 postperpage = 2;
 currentpage = 1;
 pagesieoption = [1, 2, 6, 9];
 userauthincation = false;
  private authlistnersub: Subscription;

  constructor(public postsService: PostsService, private Authserv: AuthService) {}

  ngOnInit() {
    this.isloading = true;
    this.postsService.getPosts(this.postperpage, this.currentpage);
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((postData: {posts: Post[], postCount: number}) => {
        this.isloading = false;
        console.log('intil1:11', postData.posts);
        this.posts = postData.posts;
        this.totalPost = postData.postCount;
        console.log('intil22', this.view);
      });
    this.userauthincation = this.Authserv.getisauth();
    this.authlistnersub = this.Authserv.getauthstatuslistner().subscribe(authenicted => {
      this.userauthincation = authenicted;
        });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authlistnersub.unsubscribe();

  }
  onChangePage(pagevent: PageEvent)
  {
    this.isloading = true;
    this.currentpage = pagevent.pageIndex + 1;
    this.postperpage = pagevent.pageSize;
    this.postsService.getPosts(this.postperpage, this.currentpage);
    console.log(pagevent);

  }
}
