import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { Ipost } from '../../models/models';
import { CustomRegex } from '../../validators/validators';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  public postForm !: FormGroup;
  public idArray:Array<number>=[1,2,3,4,5,6,7];
  public isInEditMode :boolean = false;
  public postEditId!:string;
  constructor(private _router:Router,
              private _postService:PostService,
              private _routes:ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.createPostForm();
    this.onEditPost();
  }
  createPostForm(){
    this.postForm = new FormGroup({
      title:new FormControl(null,[Validators.required,Validators.minLength(4),Validators.maxLength(16)]),
      content:new FormControl(null,[Validators.required,Validators.minLength(4),Validators.maxLength(60)]),
      userId:new FormControl(null,[Validators.required]),
    })
  }


  onPostFormSubmit(){
    console.log(this.postForm.value);
    if(this.postForm.value){
      let object = this.postForm.value;
      this._postService.creatPostObj(object)
      .subscribe(res=>{
        console.log(res);
        this._router.navigate(['/'])
        this.postForm.reset();
      })
    }
  }

 onEditPost(){

  this._routes.params
    .subscribe((params:Params)=>{
      this.postEditId=params['postId']
       if(this.postEditId){
  this.isInEditMode=true;
  this._postService.getSinglePost(this.postEditId)
    .subscribe(res=>{
      console.log(res);
      this.postForm.patchValue(res)
    })
 }

    })
//   this.postEditId = this._routes.snapshot.params['postId']
//  if(this.postEditId){
//   this.isInEditMode=true;
//   this._postService.getSinglePost(this.postEditId)
//     .subscribe(res=>{
//       console.log(res);
//       this.postForm.patchValue(res)
//     })
//  }
 }

  onUpdatePost(){
    let updateObj = this.postForm.value;
    console.log(updateObj);
    
    let updatedObj:Ipost={
      ...updateObj,
      id:this.postEditId
    }
    this._postService.getupdatePost(updatedObj)
      .subscribe(res=>{
        console.log(res);
        this.postForm.reset();
        this._router.navigate(['/'])
        
      })
  }
}
