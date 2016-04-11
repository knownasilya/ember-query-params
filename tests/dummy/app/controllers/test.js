import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: [
    'hello',
    { myName: 'name' }
  ]
});
