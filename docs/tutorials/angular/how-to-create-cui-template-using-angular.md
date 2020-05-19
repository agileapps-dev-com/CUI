# Creating a CUI template for AgileApps using Angular framework
Using the Custom User Interface (CUI) template feature availabe in AgileApps version 10.13.5+, you can customize the platform's run-time user interface. The ace-lib components library offers a set of pre-built user interface components to be used in CUI templates.

## Prerequisites:
* knowledge of AgileApps platform - version 10.13.5+
* Knowledge of [Angular](https://angular.io/docs) framework. - version 8+


## Using 'ace-lib' components  library:
CUI templates can use the 'ace-lib' library components available in the platform verson 10.13.5+. 
> *Note: This article uses the 10.13.5 version of the 'ace-lib' component apis.*
### Handling API 'attributes' and 'events' and  from ace-lib components in angular app:
***Events:*** The `ace-lib` component's events can be handled using the angular way of event binding.
***Attributes:*** The `ace-lib` component's attributes has to be transformed into `camelCase` instead of the `-` in between them.

## 1. Create an angular project for CUI template:
### Step 1: Create an Angular App:
Create an angular CUI template app by following the instructions available at [ Creating an angular project for CUI template](./creating-angular-project-for-agileapps-cui-template.md).

### Step 2: Creating pages in Angular based CUI template app:
* [Creating a login page using &lt;ace-login-form&gt; &lt;/ace-login-form&gt; component](create-a-login-page-in-angular.md).

> *Tip: You can create as many pages (routes) as you wish and add more contents to this angular app.*

## 2. Publishing an Angular CUI template

### Step 1: Production build for angular app
Run the below command to generate the production build artifacts.
```bash
ng build --prod
```
upon successful build, the production build artifacts will be available inside `dist/hello-cui` directory.
### Step 2: Add the `template-details.json`
Every CUI template should contain a `template-details.json` with the template name and version. Hence, put this file inside `dist/hello-cui/` directory. Below is a sample content for the `template-details.json`

```json
{
  "name":"helloCuiTemplate",
  "version":"1.0"
}
```
### Step 3: Create  CUI template zip file
Create a zip file of `dist/hello-cui/` directory. Now the CUI template is ready for deployment.

> **Note:** Remove any unsupport file extensions inside the zip file.

*Tip: Angular apps generally, have a default `favicon.ico` present in the production built artifacts, this can be removed from the zip file and the reference from the `index.html` can be removed. If you wish this file to be present, make sure `*.ico` files are permitted to upload in the tenant, before attempting to install this template* 

## 3. Install the CUI template in the platform.
To install the CUI template, follow the documentation for CUI template deployment.

## 4. Post deployment activities:
Try accessing the 'access URL'. You should get the default app page up and running.

*Tip: If the default page is not loaded, check for any possible console errors. When you do not have any default-route configured in the application, you may see an empty screen. In this scenario, manually activating the route will render the content.*

## Summary
With the `CUI template` and `ace-lib` library, you can create convert angular app as CUI template. `ace-lib` library contains a handful of ready made components with SASS based themeing support.

The source code used in this tutorial is [available here](./sample-code/hello-cui.zip).