import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: any;
  erroroccured: boolean = false
  isSubmitted: boolean = false;
  errormessege: any;
  currenturl: any;

  constructor(private formBuilder: FormBuilder, private router: Router,private authservice:AuthenticationService) {

  }

  ngOnInit(): void {

    this.currenturl = this.router.url;
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      loginPassword: ['', [Validators.required,
      Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[!@$%^&-]).{8,15}$')]],

    });
  }
  get f() {
    return this.loginForm.controls;
  }

  hide: boolean = true;
  eyefunction() {
    this.hide = !this.hide;
  }

  Login(){
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    let payload={
      username:this.loginForm.value.userName,
      password:this.loginForm.value.loginPassword

    }
    this.authservice.loginapi(payload).subscribe((response)=>{
      
      if(response.User || response.user){
        sessionStorage.setItem('username',this.loginForm.value.userName)
        sessionStorage.setItem('token',response.token)
        console.log(response)
        this.router.navigate(['Home'])
      }
      else{
        this.erroroccured=true
        this.errormessege=response.msg

      }
    })
  }
}
