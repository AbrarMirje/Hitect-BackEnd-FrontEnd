import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NavigationExtras, Router } from '@angular/router';
import { StorageService } from '../../services/storage/storage.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent implements OnInit {
  constructor(
    private service: AuthService,
    private router: Router,
    private storage: StorageService,
    private formBuilder: FormBuilder,
    private toast: ToastrService
  ) {}

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  login() {
    this.service.login(this.form.value).subscribe((res) => {
      if (res !== null) {
        this.storage.saveUser(res);
        if (this.storage.getUser() !== null && this.storage.getUserRole() == 'COUNTER_ADMIN') {
          this.router.navigate(['/home']);
        } else if (this.storage.getUser() !== null && this.storage.getUserRole() == 'KITCHEN_ADMIN') {
          this.router.navigate(['/kitchen-home/kitchen']);
        } else {
          this.toast.warning(
            'Username or Password is incorrect',
            'Invalid Credentials'
          );
        }
      }
    },err=>{
      this.toast.warning(
        err,
        'Invalid Credentials'
      );
    });
  }
}
