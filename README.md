incrstdev
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Provides a method to compute a sample standard deviation incrementally.


## Installation

``` bash
$ npm install compute-incrstdev
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

To use the module,

``` javascript
var incrstdev = require( 'compute-incrstdev' );
```

#### incrstdev()

Returns an initialized method to compute a sample standard deviation incrementally.

``` javascript
var stdev = incrstdev();
```

#### stdev( [value] )

If provided a `value`, the method updates and returns the updated sample standard deviation. If not provided a `value`, the method returns the current sample standard deviation.

``` javascript
stdev( 2 );

console.log( stdev( 1 ) );
// returns ~0.7071

stdev( 3 );

console.log( stdev() );
// returns 1
```


## Examples

``` javascript
var incrstdev = require( 'compute-incrstdev' );

// Initialize a method to calculate the sample standard deviation incrementally:
var stdev = incrstdev();

// Simulate some data...
for ( var i = 0; i < 1000; i++ ) {
	stdev( Math.random() * 100 );
}

console.log( stdev() );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```

## Notes

The use case for this module differs from the conventional [vector](https://github.com/compute-io/stdev) implementation and the [stream](https://github.com/flow-io/?query=stdev) implementation.

The use case for the vector implementation is where you have a known dataset and want to calculate a summary statistic (e.g., a single number characterizing the width of a distribution).

The use case for the stream implementation is where you have either (1) a stream source, which may or may not be definite, or (2) a desire to continually stream each updated value.

The incremental implementation overlaps both use cases, but also provides an additional benefit. Namely, this module decouples the act of updating the sample standard deviation from the act of consuming the sample standard deviation.

For example, suppose every 2 seconds your application receives a new value from a remote data source and you want to continuously update the sample standard deviation.

In a streaming implementation, the updated sample standard deviation is either pooled (chunked) or automatically piped to a new destination. The consumer is ultimately responsible for discarding incoming observations.

In contrast to the streaming (push) model, an incremental implementation provides a pull model in which consumers can choose when to observe the current value. Such behavior is important if we consider that, instead of observing on a regular interval (streaming), observations may be random. This module is more amenable to such observation indeterminacy.


## Tests

### Unit

Unit tests use the [Mocha](http://visionmedia.github.io/mocha) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


## License

[MIT license](http://opensource.org/licenses/MIT). 


---
## Copyright

Copyright &copy; 2014. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/compute-incrstdev.svg
[npm-url]: https://npmjs.org/package/compute-incrstdev

[travis-image]: http://img.shields.io/travis/compute-io/incrstdev/master.svg
[travis-url]: https://travis-ci.org/compute-io/incrstdev

[coveralls-image]: https://img.shields.io/coveralls/compute-io/incrstdev/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/incrstdev?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/incrstdev.svg
[dependencies-url]: https://david-dm.org/compute-io/incrstdev

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/incrstdev.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/incrstdev

[github-issues-image]: http://img.shields.io/github/issues/compute-io/incrstdev.svg
[github-issues-url]: https://github.com/compute-io/incrstdev/issues