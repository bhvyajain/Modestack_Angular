import { CanActivate ,ActivatedRouteSnapshot,RouterStateSnapshot,UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
@Injectable()
export  class AuthGuard implements CanActivate{
  constructor(private router:Router,private authserv:AuthService){}
    canActivate(route: ActivatedRouteSnapshot,
         state: RouterStateSnapshot):
          boolean  | Observable<boolean> | Promise<boolean> {
      const isauth=this.authserv.getisauth();

    if (!isauth){
      this.router.navigate(['/login']);
    }      
      return isauth;
    }

}