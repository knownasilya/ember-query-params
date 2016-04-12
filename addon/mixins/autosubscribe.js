import Ember from 'ember';

const { inject } = Ember;

export default Ember.Mixin.create({
  paramsRelay: inject.service(),

  beforeModel() {
    var paramsRelay = this.get('paramsRelay');
    var routeName = this.routeName || this.router.currentRouteName;
    var controller = this.controllerFor(routeName);

    paramsRelay.autoSubscribe(controller);
    return this._super(...arguments);
  },

  subscribeParam(name, cb) {
    var paramsRelay = this.get('paramsRelay');

    paramsRelay.subscribe(name, cb);
  },

  unsubscribeParam(name, cb) {
    var paramsRelay = this.get('paramsRelay');

    paramsRelay.unsubscribe(name, cb);
  },

  actions: {
    queryParamsDidChange: function eqpQueryParamsDidChange() {
      var paramsRelay = this.get('paramsRelay');
      var params = this.paramsFor(this.routeName);

      paramsRelay.setParams(params);
      return this._super(...arguments);
    }
  }
});
