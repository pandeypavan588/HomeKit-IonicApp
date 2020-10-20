import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/constants/constant';
import { userInterface } from 'src/app/interface/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  showPassword = false;

  public loginForm: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.min(8)]),
    
  });

  constructor(
    private router: Router,
    private authService : AuthService
    ) { }

  ngOnInit() {
  }

  doLogin(){
    let formData:userInterface = this.loginForm.value
       this.authService.login(formData).then((res)=>{
         console.log('res------>',res)
         if(res){
          this.router.navigateByUrl(AppRoutes.HOME)
         }
       })
      
    
    

  }

  togglePasswordFieldType(): void {
    this.showPassword = !this.showPassword;
}

}
