import Ember from 'ember';

const { inject } = Ember;

export default Ember.Mixin.create({
  paramsRelay: inject.service(),

  init() {
    this._super(...arguments);
    var originalBeforeModel = this.beforeModel;

    this.beforeModel = function eqpBeforeModel() {
      var paramsRelay = this.get('paramsRelay');
      var routeName = this.routeName || this.router.currentRouteName;
      var controller = this.controllerFor(routeName);

      paramsRelay.autoSubscribe(controller);
      originalBeforeModel.bind(this, ...arguments);
    };

    var originalQPsDidChange = this.actions.queryParamsDidChange;

    // Override `queryParamsDidChange` action for updating the paramsRelay
    // service on QP URL value changes
    this.actions.queryParamsDidChange = function eqpQueryParamsDidChange() {
      var paramsRelay = this.get('paramsRelay');
      var params = this.paramsFor(this.routeName);

      paramsRelay.setParams(params);
      originalQPsDidChange.bind(this, ...arguments);
    };
  },

  subscribeParam(name, cb) {
    var paramsRelay = this.get('paramsRelay');

    paramsRelay.subscribe(name, cb);
  },

  unsubscribeParam(name, cb) {
    var paramsRelay = this.get('paramsRelay');

    paramsRelay.unsubscribe(name, cb);
  }
});
