import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  @ViewChild('userForm') form = NgForm;
  id: string =''
  name: string=''
  email: string=''

  onGetByID(){

    console.log("onGetByID", this.id);
    
  }
  onDelByID(){
    console.log("OonDelByID", this.id);
    
  }
  onGetAll(){
    console.log("onGetAll");
    
  }
  onInsert(){
    console.log("onInsert", this.id, this.name, this.email);
    
  }
  onUpdate(){
    console.log("onUpdate", this.id, this.name, this.email);
    
  }
}
