import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({
  paramsRelay: service('params-relay'),
  appName: 'Ember Twiddle',
  queryParams: ['theme', { isSidebar: 'sidebar' }],
  theme: 'bye',
  isSidebar: false,
  counter: 0,

  init() {
    this._super(...arguments);
    var paramsRelay = this.get('paramsRelay');

    paramsRelay.autoSubscribe(this);
    paramsRelay.subscribe('theme', (key, theme) => this.set('theme2', theme+2));
    //paramsRelay.subscribe('theme', (key, theme) => this.set('theme', theme));
  },

  actions: {
  	updateTheme() {
    	var paramsRelay = this.get('paramsRelay');
      var counter = this.incrementProperty('counter');

      paramsRelay.setParam('theme', `hi${counter}`);
      paramsRelay.setParam('isSidebar', counter % 2 === 1);
    }
  }
});
