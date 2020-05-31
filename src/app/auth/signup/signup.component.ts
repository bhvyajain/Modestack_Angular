import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  isLoading = false;
  constructor(public authservice: AuthService) { }

  ngOnInit() {
  }
onSignup(form: NgForm) {
if (form.invalid) {
  return;
}
this.isLoading=true;
this.authservice.createUser(form.value.username,form.value.password,form.value.email, form.value.address);
}
}
