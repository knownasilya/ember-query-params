import EmberObject from '@ember/object';
import QueryParamsMixin from 'ember-query-params/mixins/query-params';
import { module, test } from 'qunit';

module('Unit | Mixin | query params', function() {
  // Replace this with your real tests.
  test('it works', function(assert) {
    let QueryParamsObject = EmberObject.extend(QueryParamsMixin);
    let subject = QueryParamsObject.create();
    assert.ok(subject);
  });
});
