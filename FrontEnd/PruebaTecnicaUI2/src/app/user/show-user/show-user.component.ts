import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserApiService } from 'src/app/user-api.service';

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.css']
})
export class ShowUserComponent implements OnInit {

  userList$!:Observable<any[]>;

  constructor(private service:UserApiService) { }

  ngOnInit(): void {
    this.userList$ = this.service.getUserList();
  }

  modalTitle:string = '';
  activateAddEditUserComponent:boolean = false;
  user:any;

  modalAdd(){
    this.user = {
      id:0,
      userName:null,
      area:null,
      cargo:null
    }
    this.modalTitle = "Añadir Usuario";
    this.activateAddEditUserComponent = true;
  }

  modalEdit(selectedUser:any){
    this.user = selectedUser;
    this.modalTitle = "Editar Usuario";
    this.activateAddEditUserComponent = true;
  }

  modalDelete(selectedUser:any){
    if(confirm(`Desea eliminar al usuario ${selectedUser.id}`)){
      this.service.deleteUser(selectedUser.id).subscribe(res => {
        var closeModalBtn = document.getElementById('add-edit-modal-close');
        if(closeModalBtn) {
          closeModalBtn.click();
        }

        var showDeleteSuccess = document.getElementById('delete-success-alert');
        if(showDeleteSuccess) {
          showDeleteSuccess.style.display = "block";
        }
        setTimeout(function() {
          if(showDeleteSuccess){
            showDeleteSuccess.style.display = "none";
          }
        }, 4000);
        this.userList$ = this.service.getUserList();
      })
    }
  }
  modalClose(){
    this.activateAddEditUserComponent = false;
    this.userList$ = this.service.getUserList();
  }
}
