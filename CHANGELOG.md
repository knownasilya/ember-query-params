# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [2.1.1](https://github.com/knownasilya/ember-query-params/compare/v2.1.0...v2.1.1) (2019-06-13)


### Bug Fixes

* deserialization of array ([#26](https://github.com/knownasilya/ember-query-params/issues/26)) ([fa38cd5](https://github.com/knownasilya/ember-query-params/commit/fa38cd5))
* handle nulls in auto subscribe queryParamsDidchange ([#24](https://github.com/knownasilya/ember-query-params/issues/24)) ([437950f](https://github.com/knownasilya/ember-query-params/commit/437950f))



# Changelog

## v2.1.0 (5/10/2016)

#### Fixes

- Normalize string arrays
- Don't set initial hash if there are params
- Copy array values, so not changed by reference

#### Features

- `hasParams` method added.

## v2.0.4 (4/18/2016)

#### Fixes

- Prevent error if hash for `setParams` is `undefined`

## v2.0.3 (4/15/2016)

#### Fixes

- Compare array values for setParam handler calls (prevent SO)
- Only send changed QPs from queryParamsDidChange action

## v2.0.2 (4/13/2016)

#### Fixes

- Don't call handlers if param value unchanged, resolves #16

## v2.0.1 (4/12/2016)

#### Fixes

- Fix duplicate sections in README

## v2.0.0 (4/12/2016)

#### Breaking Changes

- `AutoSubscribe` mixin is now for the route, and not the controller. See the README for new usage instructions.
- Auto controller defaults are only setup if those params are not setup in the service yet.

## v1.3.0 (4/8/2016)

#### Features

- `setParams` - new method on the `paramsRelay` service which allows setting an object of keys/values as params.

## v1.2.0 (4/8/2016)

#### Features

- Auto set defaults on `autoSubscribe`

## v1.1.0 (4/8/2016)

#### Features

- Controller Mixin
- Unsubscribe methods

## v1.0.5 (4/8/2016)

#### Fixes

- Remove use of `Map` so no polyfill is required

## v1.0.4 (4/7/2016)

#### Fixes

- Allow multiple map instances, fixes usage in tests

## v1.0.3 (4/7/2016)

#### Fixes

- Don't update callbacks if object destroyed. Thanks @rwjblue

## v1.0.2 (4/7/2016)

#### Fixes

- Add tests

## v1.0.1 (4/7/2016)

#### Fixes

- Readme updates

## v1.0.0 (4/7/2016)

- Initial Release
