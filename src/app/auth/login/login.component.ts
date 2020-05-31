import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 isLoading=false;
 constructor(public authservice: AuthService) { }

  ngOnInit() {
  }
onLogin(form: NgForm){
 
if (form.invalid) {
  return;
}
this.isLoading=true;
this.authservice.login(form.value.email, form.value.password);
}
}


