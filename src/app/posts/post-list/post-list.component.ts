import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  noPosts = 'no posts available';
  posts: Post[] = [];
  postsService: PostsService;
  private postsSub: Subscription;

  constructor(postsService: PostsService) {
    this.postsService = postsService;
  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }

  ngOnInit() {
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdatedListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
