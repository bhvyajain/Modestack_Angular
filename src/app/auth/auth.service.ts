import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData, AuthData1 } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { DataRowOutlet } from '@angular/cdk/table';

@Injectable({
    providedIn: 'root'})


export class AuthService{
    constructor(private http: HttpClient,private router: Router){}
  private token :string;
  private tokenTimes:any;
  isauthenticate=false;
  private authStatusListner=new Subject<boolean>();
y
getauthstatuslistner(){
    return this.authStatusListner.asObservable();
}
    gettoken(){
        return this.token;
    }   
     createUser(username:string,password:string,email:string,address:string){
    const authData: AuthData1={username:username,password:password,email:email,address:address};
    this.http.post('http://localhost:8030/register',authData).subscribe((respo)=>{
   console.log(respo);
   this.router.navigate(['/login']);
    })
}
login(email:string,password:string){
    const authData:AuthData={email:email,password:password};
    this.http.post<{message:string,token:string,expiresIn:number}>('http://localhost:8030/login',authData).subscribe((respo)=>{
   console.log(respo);
   const token=respo.token;
   this.token=token;
   if(token){
       const expiresInduration=respo.expiresIn;
      console.log(expiresInduration);
     this.setAuthTimer(expiresInduration);
      const now=new Date();
      const expirationDate=new Date(now.getTime()+expiresInduration*1000);
     console.log(expirationDate);
      this.saveAuthData(token,expirationDate);
       this.isauthenticate=true;
       
   this.authStatusListner.next(true);
  this.router.navigate(['/']);
}});
}
private setAuthTimer(duration:number){
    console.log('setting time',duration);
    this.tokenTimes= setTimeout(()=>{
        this.logout();
              },duration*1000);
}
autoAuthuser(){
const authinfo=this.getauthdat();
if(!authinfo){
    return;
}
const now=new Date();
const expiresIn=authinfo.expirationDate.getTime()-now.getTime();
console.log(authinfo,expiresIn);
if(expiresIn>0){
    this.token=authinfo.token;
    this.isauthenticate=true;
    this.setAuthTimer(expiresIn/1000);
    this.authStatusListner.next(true);
}
}

private saveAuthData(token:string,expirationInDate:Date)
{
localStorage.setItem('token',token);
localStorage.setItem('expiration',expirationInDate.toISOString());
}
private clearAuthData(){
localStorage.removeItem('token');
localStorage.removeItem('expiration');
}

getisauth()
{
    return this.isauthenticate;
}
logout(){
   this.token=null;
   this.isauthenticate=false; 
   this.authStatusListner.next(false);
   clearTimeout(this.tokenTimes);
   this.clearAuthData();
   this.router.navigate(['/']);

}
private getauthdat(){
    const token=localStorage.getItem('token');
    const expirationDatels=localStorage.getItem('expiration');
    if(!token  || !expirationDatels)
    {
return;
    }return{
        token:token,
        expirationDate:new Date(expirationDatels)
    }

}

}
