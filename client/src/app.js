import {Redirect} from 'aurelia-router';
import moment from 'moment';

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
      {route: '/', redirect: 'home'},
      {route: '/home', name: 'home', moduleId: 'home', nav: true, title: 'Home', auth: true},
      {route: '/jobs', name: 'jobs', moduleId: 'jobs', nav: false, title: 'Jobs', auth: true},
      {route: '/jobs/:id', name: 'job', moduleId: 'job', nav: false, title: 'Job Detail', auth: true},
      { route: '/jobs/new', name: 'jobNew', moduleId: 'jobNew', nav: false, title: 'New Job', auth: true },
      { route: '/settings', name: 'settings', moduleId: 'settings', nav: true, title: 'Settings', auth: true },
      // {route: '/reports', name: 'repo1`  1`rts', moduleId: 'reports', nav: true, title: 'Reports', auth: true},
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
