import { Component} from '@angular/core';
import { NgForm } from '@angular/forms';
import { LogService } from '../../services/log.service';
import { NotifyService } from '../../services/notify.service';
import { User } from '../user';

@Component({
  selector: 'app-template-driven',
  templateUrl: './template-driven.component.html',
  styleUrls: ['./template-driven.component.css']
})
export class TemplateDrivenFormComponent {
   user: User;

  constructor(private logService: LogService, private notifyService: NotifyService) {
    logService.log('TemplateDrivenFormComponent is created');
  }

  login(form: NgForm) {
    const content = `<h4>Login Form<h4/>
                     <h5>Login: ${form.value.login}</h5>
                     <h5>Password: ${form.value.password}</h5>`;
    this.notifyService.Instance.html(content, 'success', null, 'success');
  }

  signUp() {
     this.notifyService.Instance.info('Login Form', 'Signing Up...');
  }
}
