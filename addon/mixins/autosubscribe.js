import Ember from 'ember';

const { inject } = Ember;

export default Ember.Mixin.create({
  paramsRelay: inject.service(),

  init() {
    var paramsRelay = this.get('paramsRelay');

    paramsRelay.autoSubscribe(this);
    this._super(...arguments);
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
