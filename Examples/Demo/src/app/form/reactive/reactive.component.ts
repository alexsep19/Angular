import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators /*, FormBuilder */ } from '@angular/forms';
import { LogService } from '../../services/log.service';
import { NotifyService } from '../../services/notify.service';

import { User } from '../user';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveFormComponent {
  user: User; // model
  loginForm: FormGroup;

  constructor(private logService: LogService, private notifyService: NotifyService
             /*, private builder: FormBuilder */) {
     logService.log('ReactiveFormComponent is created');
     this.user = new User();
     this.user.login = 'guest'; // usually from db
     this.configure();
  }

  private configure() {
     this.loginForm = new FormGroup({
        'login': new FormControl(this.user.login, [Validators.required, Validators.minLength(5), this.noNumberValidator]),
        'password': new FormControl(null, [Validators.required, Validators.pattern('[0-9]{5,}')])
     });

    /* this.loginForm = this.builder.group({
         'login': [this.user.login, [Validators.required, Validators.minLength(5), this.noNumberValidator]],
         'password': [null, [Validators.required, Validators.pattern('[0-9]{5,}')]]
     });
    */
  }

  // custom validator
  noNumberValidator(control: FormControl): {[s: string]: boolean} {
    if (/[0-9]/.test(control.value)) {
      return {'noNumber': true};
    }
      return null;
  }

  login() {
     // update dataModel user & do smth.
     const content = `<h4>Login Form<h4/>
     <h5>Login: ${this.loginForm.get('login').value}</h5>
     <h5>Password: ${this.loginForm.controls.password.value}</h5>`;
     this.notifyService.Instance.html(content, 'success', null, 'success');
  }

  signUp() {
    this.notifyService.Instance.info('Login Form', 'Signing Up...');
  }
}
