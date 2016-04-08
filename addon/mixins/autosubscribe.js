import Ember from 'ember';

const { inject } = Ember;

export default Ember.Mixin.create({
  paramsRelay: inject.service(),

  init() {
    var paramsRelay = this.get('paramsRelay');

    paramsRelay.autoSubscribe(this);
    this._super(...arguments);
  }
});
