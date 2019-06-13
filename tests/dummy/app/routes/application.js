import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default Route.extend({
  paramsRelay: service(),

  actions: {
    queryParamsDidChange() {
      var paramsRelay = this.get('paramsRelay');

      paramsRelay.setParams(this.paramsFor(this.routeName));
    }
  }
});
