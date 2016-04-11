import Ember from 'ember';

const { inject } = Ember;

export default Ember.Route.extend({
  paramsRelay: inject.service(),

  actions: {
    queryParamsDidChange() {
      var paramsRelay = this.get('paramsRelay');

      paramsRelay.setParams(this.paramsFor(this.routeName));
    }
  }
});
