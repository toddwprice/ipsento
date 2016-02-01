import {Redirect} from 'aurelia-router';

export class App {
  get user() {
    if (window.localStorage.currentUser)
      return JSON.parse(window.localStorage.currentUser);
    else
      return {first_name:'Guest', last_name: 'User'};
  }

  configureRouter(config, router) {
    config.title = 'Ipsento';
    // config.addPipelineStep('authorize', AuthorizeStep);
    config.map([
      {route: '', redirect: 'dashboard'},
      {route: '/dashboard', name: 'dashboard', moduleId: 'dashboard', nav: true, title: 'Dashboard', auth: true},
      {route: '/jobs', name: 'jobs', moduleId: 'jobs', nav: true, title: 'Jobs', auth: true},
      {route: '/jobs/:id', name: 'job', moduleId: 'job', nav: false, title: 'Job Detail', auth: true},
      {route: '/jobs/new', name: 'jobNew', moduleId: 'jobNew', nav: false, title: 'New Job', auth: true},
      {route: '/reports', name: 'reports', moduleId: 'reports', nav: true, title: 'Reports', auth: true},
      {route: '/tools', name: 'tools', moduleId: 'tools', nav: true, title: 'Tools', auth: true}
    ]);

    this.router = router;
  }
}

class AuthorizeStep {
  run(navigationInstruction, next) {
    if (navigationInstruction.getAllInstructions().some(i => i.config.auth)) {
      let user = (window.localStorage.currentUser ? JSON.parse(window.localStorage.currentUser) : {token: ''});
      var isLoggedIn = (user.token != '');
      if (!isLoggedIn) {
        return next.cancel(new Redirect('login'));
      }
    }

    return next();
  }
}
