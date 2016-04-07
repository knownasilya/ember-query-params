import Ember from 'ember';

export default Ember.Controller.extend({
  paramsService: Ember.inject.service('params'),
  appName: 'Ember Twiddle',
  queryParams: ['theme', { isSidebar: 'sidebar' }],
  theme: 'bye',
  isSidebar: false,
  counter: 0,

  init() {
    this._super(...arguments);
    var paramsService = this.get('paramsService');

    //paramsService.subscribe('theme', (key, theme) => this.set('theme', theme));
    paramsService.autoSubscribe(this);
    paramsService.subscribe('theme', (key, theme) => this.set('theme2', theme+2));
  },

  actions: {
  	updateTheme() {
    	var paramsService = this.get('paramsService');
      var counter = this.incrementProperty('counter');

      paramsService.setParam('theme', `hi${counter}`);
      paramsService.setParam('isSidebar', counter % 2 === 1);
    }
  }
});
