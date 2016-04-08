# ember-query-params

Ember service for your query params

[![NPM][npm-badge-img]][npm-badge-link]
[![Build Status][travis-badge]][travis-badge-url]
[![Ember Observer Score][ember-observer-badge]][ember-observer-url]
![Ember Version][ember-version]

This addon is in response to https://github.com/emberjs/ember.js/issues/11592.  
The idea came from [Robert Jackson].

## Usage

```js
import Ember from 'ember';
import AutosubscribeMixin from 'ember-query-params/mixins/autosubscribe';

export default Ember.Controller.extend(AutosubscribeMixin, {
  queryParams: [
    'theme',
    { isSidebarOpen: 'sidebar' }
  ],
  isSidebarOpen: false,
  theme: 'default'
});
```

This will use `paramsRelay.autoSubscribe(controller)` on `init` and later
tear down on `willDestroy`. All default queryParam values are automatically set on
the `paramsRelay` service. You also get a couple proxy methods, `subscribeParam` and
`unsubscribeParam` which work the same as the equivalent methods on the service.  
Or you can use the service directly for maximum control.

```js
import Ember from 'ember';

const { inject, Controller } = Ember;

export default Controller.extend({
  paramsRelay: inject.service(),

  queryParams: [
    'theme',
    { isSidebarOpen: 'sidebar' }
  ],
  isSidebarOpen: false,
  theme: 'default',

  init() {
    this._super(...arguments);
    var paramsRelay = this.get('paramsRelay');

    paramsRelay.autoSubscribe(this);
    // or
    paramsRelay.subscribe('theme', (name, val) => {
      // name => 'theme'
      this.set(name, val);
    });
  }
});
```

In another place:

```js
import Ember from 'ember';

const { inject, Controller } = Ember;

export default Controller.extend({
  paramsRelay: inject.service(),

  actions: {
    toggleSidebar(val) {
      var paramsRelay = this.get('paramsRelay');

      paramsRelay.setParam('isSidebarOpen', val);
    }
  }
});
```

## Service API

#### `setParam`

Function signature `paramsRelay.setParam('name', value)`.

#### `getParam`

Function signature `paramsRelay.getParam('name')`. Returns the value, can be anything.

#### `setParams`

Function signature `paramsRelay.setParams(obj)`.
A helper method to set many query params at once. Suggested usage includes
using in the route, i.e. `paramsRelay.setParams(this.paramsFor(this.routeName))`.

#### `subscribe`

Function signature `paramsRelay.subscribe('name', (key, value) => { //do something });`.

#### `unsubscribe`

Function signature `paramsRelay.unsubscribe('name', sameFunctionUsedInSubscribe)`.
The function you passed to `subscribe` must be the same one passed to `unsubscribe` to remove it from
the list of callbacks to notify on change.

#### `autoSubscribe`

Function signature `paramsRelay.autoSubscribe(this)`.  
Where `this` is the controller that has a `queryParams` array.
All default query param values from the controller are set on the `paramsRelay` service.
All query params must have a unique name, since setting a 'theme' in one controller will set the same QP in another.


## Custom Service

You can also setup your own service, just use the mixin.

```js
import Ember from 'ember';
import QPMixin from 'ember-query-params/mixins/query-params';

export default Ember.Service.extend(QPMixin, {
  // your code
});
```

## Contributing

See [CONTRIBUTING.md].

[npm-badge-img]: https://badge.fury.io/js/ember-query-params.svg
[npm-badge-link]: http://badge.fury.io/js/ember-query-params
[travis-badge]: https://travis-ci.org/knownasilya/ember-query-params.svg
[travis-badge-url]: https://travis-ci.org/knownasilya/ember-query-params
[ember-observer-badge]: http://emberobserver.com/badges/ember-query-params.svg
[ember-observer-url]: http://emberobserver.com/addons/ember-query-params
[ember-version]: https://embadge.io/v1/badge.svg?start=1.13.0
[Robert Jackson]: https://github.com/rwjblue
[polyfill]: https://github.com/babel/ember-cli-babel#polyfill
[CONTRIBUTING.md]: CONTRIBUTING.md
