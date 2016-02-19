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
      {route: '/', redirect: 'roast'},
      { route: '/roast', name: 'roast', moduleId: 'roast', nav: true, title: 'Roast', settings: { html: '<i class="fa fa-fire"></i> Roast' }, auth: false },
      { route: '/settings', name: 'settings', moduleId: 'settings', nav: true, title: 'Settings', settings: {html: '<i class="fa fa-gear"></i> Settings'}, auth: false },
      { route: '/print', name: 'print', moduleId: 'print', nav: false, auth: true }
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
