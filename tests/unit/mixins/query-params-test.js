import Ember from 'ember';
import QueryParamsMixin from 'ember-query-params/mixins/query-params';
import { module, test } from 'qunit';

module('Unit | Mixin | query params');

// Replace this with your real tests.
test('it works', function(assert) {
  let QueryParamsObject = Ember.Object.extend(QueryParamsMixin);
  let subject = QueryParamsObject.create();
  assert.ok(subject);
});
