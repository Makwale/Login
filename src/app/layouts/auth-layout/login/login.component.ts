import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';
import swal from "sweetalert2";
import { CognitoUser } from '@aws-amplify/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  signinForm: FormGroup;
  isCreated: boolean = false;
  hasSixOrMoreCharecters: boolean;
  hasSpecialCharecter: boolean;
  hasNumber: boolean;
  hasUppercase: boolean;
  
  constructor(private as: AuthService, private dbs: DatabaseService, private router: Router,
    private acs: AccountService) { }

  ngOnInit(): void {
    this.signinForm = new FormBuilder().group({
      username: ['', [Validators.email ,Validators.required ]],
      password: ['', [Validators.minLength(6), Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&].{7,}')]],
    })

  }



  async signin() {
    console.log(this.signinForm.get('password').errors);
    if(this.signinForm.valid){
      try{
        await this.as.signup(this.signinForm);
        const user: CognitoUser = await this.as.sigin(this.signinForm);
        console.log(user);
      }catch(error){
        console.log(error);
      }
    }
  }

}
