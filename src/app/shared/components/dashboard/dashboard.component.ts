import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Ipost } from '../../models/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public AllPosts :Array<Ipost>=[]
  constructor(private _postService:PostService,
              private _router:Router
    ) { }

  ngOnInit(): void {
     this._postService.getAllPost()
      .subscribe(res=>{
        console.log(res);
        this.AllPosts=res;
      })
  }

  onDeletePost(postid:string){
    let isConfirm = confirm('Are You Sure You Want To Delete?')
    if(isConfirm){
      document.getElementById(postid)?.remove()
      this._postService.getDeletePost(postid)
      .subscribe(res=>{
        console.log(res);
       return  isConfirm;
      })
    }else{
      !isConfirm;
    }
    
  }

}
