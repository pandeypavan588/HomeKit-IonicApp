import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { AppRoutes } from 'src/app/constants/constant';
import { AuthService } from '../../services/auth.service';

export const confirmPasswordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  if (!control.parent || !control) {
    return null;
  }

  const password = control.parent.get("password");
  const passwordConfirm = control.parent.get("passwordConfirm");

  if (!password || !passwordConfirm) {
    return null;
  }

  if (passwordConfirm.value === "") {
    return null;
  }

  if (password.value === passwordConfirm.value) {
    return null;
  }

  return { passwordsNotMatching: true };
};

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"],
})
export class RegisterPage implements OnInit {
  showPassword = false;

  public registerForm: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.min(8)]),
    passwordConfirm: new FormControl("", [
      Validators.required,
      Validators.min(8),
      confirmPasswordValidator,
    ]),
  });

  constructor(
    private router: Router,
    private authService : AuthService
    ) {}

  ngOnInit() {}

  doRegister() {
    let formData = this.registerForm.value;

    console.log(formData.name);
    console.log(formData.email);
    console.log(formData.password);
    console.log(formData.passwordConfirm);
    

     this.authService.registerWithEmailAndPassword(formData.email,formData.password)
     .subscribe({
      next: (res) => {
        if (res !== null) {
            this.router.navigateByUrl(AppRoutes.LOGIN);
        }
    },
    error: (err) => {
        console.error('Error====>',err);
        // let errorMsg = err.code.split('/')[1];
        // this.toastService.presentToast(errorMsg,'danger');
    }
     })

    // this.router.navigateByUrl(AppRoutes.LOGIN);
  }

  togglePasswordFieldType(): void {
    this.showPassword = !this.showPassword;
  }
}
