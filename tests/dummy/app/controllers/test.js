import Ember from 'ember';
import AutosubscribeMixin from 'ember-query-params/mixins/autosubscribe';

export default Ember.Controller.extend(AutosubscribeMixin, {
  queryParams: [
    'hello',
    { myName: 'name' }
  ]
});
