import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserApiService } from 'src/app/user-api.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit {


  constructor(private service:UserApiService) { }

  @Input() user:any;
  id: number = 0;
  userName: string = "";
  area: string = "";
  cargo: string = "";

  ngOnInit(): void {
    this.id = this.user.id;
    this.userName = this.user.userName;
    this.area = this.user.area;
    this.cargo = this.user.cargo;
  }

  addUser(){
    var user = {
      userName:this.userName,
      area:this.area,
      cargo:this.cargo
    }
    this.service.addUser(user).subscribe(res => {
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn){
        closeModalBtn.click();
      }

      var showAddSuccess = document.getElementById('add-success-alert');
      if(showAddSuccess){
        showAddSuccess.style.display = "block";
      }
      setTimeout(function() {
        if(showAddSuccess){
          showAddSuccess.style.display = "none";
        }
      }, 4000);
    })
  }

  updateUser(){
    var user = {
      id:this.id,
      userName:this.userName,
      area:this.area,
      cargo:this.cargo
    }
    var id:number = this.id;
    this.service.updateUser(id, user).subscribe(res => {
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn){
        closeModalBtn.click();
      }

      var showUpdateSuccess = document.getElementById('update-success-alert');
      if(showUpdateSuccess){
        showUpdateSuccess.style.display = "block";
      }
      setTimeout(function() {
        if(showUpdateSuccess){
          showUpdateSuccess.style.display = "none";
        }
      }, 4000);
    })
  }
}
