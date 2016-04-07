import Ember from 'ember';

export default Ember.Controller.extend({
  paramsRelay: Ember.inject.service('params-relay'),
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
