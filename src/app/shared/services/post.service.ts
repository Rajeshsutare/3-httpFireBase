import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Ipost } from '../models/models';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  postBaseUrl:string=`${environment.baseUrl}/posts.json`
  constructor(private _http:HttpClient) { }

  creatPostObj(obj:Ipost):Observable<Ipost>{
    return this._http.post<Ipost>(this.postBaseUrl,obj)
  }


  getAllPost():Observable<Array<Ipost>>{
    return this._http.get<any>(this.postBaseUrl)
    .pipe(
      map(res=>{
        console.log(res);
        let postArray :Array<Ipost>=[];
       for (const key in res) {
        let obj:Ipost={
          title:res[key].title,
          content:res[key].content,
          userId:res[key].userId,
          id : key
        }
        postArray.push(obj)
       }
       return postArray
      })
    )
  }

  getSinglePost(id:string){
    let singlepostUrl = `${environment.baseUrl}/posts/${id}.json`;
    return this._http.get<Ipost>(singlepostUrl)
  }

  getupdatePost(post:Ipost){
    let singlePostUrl = `${environment.baseUrl}/posts/${post.id}.json`;
    return this._http.patch(singlePostUrl,post)
  }

  getDeletePost(id:string){
    let deleteId = `${environment.baseUrl}/posts/${id}.json`;
    return this._http.delete(deleteId)
  }

}
