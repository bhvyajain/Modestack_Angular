import { Component } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  userauthincation=false;
  private authlistnersub: Subscription;
  constructor(private authserve:AuthService){
  }

  ngOnInit(){
    this.userauthincation=this.authserve.getisauth();
this.authlistnersub =this.authserve.getauthstatuslistner().subscribe(authenicted=>{
this.userauthincation=authenicted;
});
  }
  ngOnDestroy(){
this.authlistnersub.unsubscribe();
  }
  onlogout(){
    this.authserve.logout();
  }
}
