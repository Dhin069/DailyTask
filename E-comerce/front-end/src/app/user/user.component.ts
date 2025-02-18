import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  posts: any

  @ViewChild('userForm') form = NgForm;
  id: string =''
  name: string=''
  email: string=''

  API_URL="http://localhost:3000/api/"

  constructor(private http: HttpClient){}

  onGetAll(){
    this.http.get(this.API_URL+"users/getusers")
      .subscribe(
        (response:any)=>{
          this.posts = response
          console.log(response);
          },
          (error)=>{
            if (error.error.msg) {
              alert(error.error.msg);
            }
            else{
              alert("Unknown err")
            }
          }
      )
  }

  onGetByID(){
    if(this.id){
      this.http.get(this.API_URL+"users/getuserbyid/"+this.id)
      .subscribe(
        (response)=>{
        this.posts = response
        },
        
        (error)=>{
          if (error.error.msg) {
            alert(error.error.msg);
          }
          else{
            alert("Unknown err")
          }
        }
    )
    }
    else{
      alert("ID needed for this request")
    }
    
  }
  
  onDelByID(){
    if(this.id){
      this.http.delete(this.API_URL+"users/deleteuser/", {body:{"id":this.id}})
      .subscribe(
        (response)=>{
        this.posts = response
        },
        
        (error)=>{
          if (error.error.msg) {
            alert(error.error.msg);
          }
          else{
            alert("Unknown err")
          }
        }
    )
    }
    else{
      alert("ID needed for this request")
    }
  }
  onInsert(){
    if(this.id&&this.name&&this.email){
      this.http.post(this.API_URL+"users/postUser", {"id":this.id, "name":this.name, "email":this.email})
        .subscribe(
          (response)=>{
            this.posts=response
          },
          (error)=>{
            if (error.error.msg) {
              alert(error.error.msg);
            }
            else{
              alert("Unknown err")
            }
          }
        )
    }
    else{
      alert("Please fill all feilds")
    }
    
  }
  onUpdate(){
    const userData: any = {};
    if(this.id) userData['id']=this.id 
    else{
      alert("ID required for this requset")
      return
    }
    if(this.name) userData['name']=this.name
    if(this.email) userData['email']=this.email

    this.http.patch(this.API_URL+"users/patchuser", userData)
      .subscribe(
        (response)=>{
          this.posts=response
        },
        (error)=>{
          if(error.error.msg){
            alert(error.error.msg)
          }
          else{
            alert("Unknown error")
          }
        }
      )
  }
}
