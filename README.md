# ember-query-params

Ember service for your query params

[![NPM][npm-badge-img]][npm-badge-link]
[![Build Status][travis-badge]][travis-badge-url]
[![Ember Observer Score][ember-observer-badge]][ember-observer-url]
![Ember Version][ember-version]

This addon is in response to https://github.com/emberjs/ember.js/issues/11592.  
The idea came from [Robert Jackson].

See the [Changelog] for version changes.


## How It Works

Basically the idea is that there is a central service that stores all QP values
and from which you can subscribe to QP changes.

We make this simple by providing a mixin for your route that sets up default QP
values on the service from your controller, and hooks into the system for QP changes
on URL updates. The controller also gets automatic subscriptions for all of it's own
QPs.

You can also use the service yourself, i.e. `paramsRelay: Ember.inject.service()` anywhere
else, and get access to setting, getting and subscribing to the QP changes.


## Usage

Setup your route with the `AutoSubscribe` mixin so we can listen for changes
in query params from the URL, and also setup automatic subscribes for all
of the query params on the related controller.

```js
// my-route.js
import Ember from 'ember';
import AutosubscribeMixin from 'ember-query-params/mixins/autosubscribe';

export default Ember.Route.extend(AutosubscribeMixin, {
  // Whatever else you have..
});
```

The `AutoSubscribe` mixin requires that your controller has `queryParams` array
setup to start relaying query params to the `paramsRelay` service.

```js
// my-controller.js
import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: [
    'theme',
    { isSidebarOpen: 'sidebar' }
  ],
  isSidebarOpen: false,
  theme: 'default'
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
## How It Works

Basically the idea is that there is a central service that stores all QP values
and from which you can subscribe to QP changes.

We make this simple by providing a mixin for your route that sets up default QP
values on the service from your controller, and hooks into the system for QP changes
on URL updates. The controller also gets automatic subscriptions for all of it's own
QPs.

You can also use the service yourself, i.e. `paramsRelay: Ember.inject.service()` anywhere
else, and get access to setting, getting and subscribing to the QP changes.
## How It Works

Basically the idea is that there is a central service that stores all QP values
and from which you can subscribe to QP changes.

We make this simple by providing a mixin for your route that sets up default QP
values on the service from your controller, and hooks into the system for QP changes
on URL updates. The controller also gets automatic subscriptions for all of it's own
QPs.

You can also use the service yourself, i.e. `paramsRelay: Ember.inject.service()` anywhere
else, and get access to setting, getting and subscribing to the QP changes.
## How It Works

Basically the idea is that there is a central service that stores all QP values
and from which you can subscribe to QP changes.

We make this simple by providing a mixin for your route that sets up default QP
values on the service from your controller, and hooks into the system for QP changes
on URL updates. The controller also gets automatic subscriptions for all of it's own
QPs.

You can also use the service yourself, i.e. `paramsRelay: Ember.inject.service()` anywhere
else, and get access to setting, getting and subscribing to the QP changes.
[Changelog]: CHANGELOG.md
