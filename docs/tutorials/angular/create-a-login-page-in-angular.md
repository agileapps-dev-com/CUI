# AgileApps CUI template: Creating a login page using &lt;ace-login-form&gt; &lt;/ace-login-form&gt; component:
A custom login page can be created using the `ace-login-form` component availble in the `ace-lib`.

## Prerequisites:
* Create an angular CUI template app by following the instructions available at [ Creating an angular project for CUI template](./creating-angular-project-for-agileapps-cui-template.md).

 If the angular app is created as per the above guidelines, then use the below angular CLI command to create a login page and login component in the application:

Navigate to 'hello-cui' app directory and run to create login module, inside the app
```bash
ng generate module login --route login --module app.module
```
Next, open the newly created `login.component.html` and paste the login component tag into it. See below:
```html
<ace-login-form css-classlist="ace-bg-white"></ace-login-form>
```
> *Note: Add addtional html tags outside the above tag and css classes if required to beautify and align the login compoent*  

Next, handle the `loginSuccess` Event, by making the below changes to the `login.component.html` and `login.component.ts` as below:

#### `login.component.html`
```html
<div class="row">
    <div class="col-4"></div>
    <div class="col-4">
        <h2>Authentication Required</h2>
        <ace-login-form css-classlist="ace-bg-white" (loginSuccess)="loginSuccessHandler($event)"></ace-login-form>
    </div>
    <div class="col-4"></div>
</div>
```
#### `login.component.ts`
```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  loginSuccessHandler(event) {
    //Handle Post login logic here.
    const loggedInUserInfo = event.detail;
    console.log('login Success', loggedInUserInfo);   

  }
  ngOnInit() {
  }

}
```


