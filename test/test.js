
// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	incrstdev = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-incrstdev', function tests() {
	'use strict';

	it( 'should export a function', function test() {
		expect( incrstdev ).to.be.a( 'function' );
	});

	it( 'should return a function', function test() {
		expect( incrstdev() ).to.be.a( 'function' );
	});

	it( 'should compute a sample standard deviation incrementally', function test() {
		var data,
			N,
			expected,
			actual,
			stdev;

		data = [ 2, 3, 2, 4, 3, 4 ];
		N = data.length;

		expected = new Array( N );
		actual = new Array( N );

		stdev = incrstdev();

		for ( var i = 0; i < N; i++ ) {
			expected[ i ] = calc( data.slice( 0, i+1 ) );
			actual[ i ] = stdev( data[ i ] );
		}

		assert.deepEqual( actual, expected );

		function calc( arr ) {
			var N = arr.length,
				sum = 0,
				M2 = 0,
				mean;
			if ( N < 2 ) {
				return 0;
			}
			for ( var i = 0; i < N; i++ ) {
				sum += arr[ i ];
			}
			mean = sum / N;
			for ( var j = 0; j < N; j++ ) {
				M2 += Math.pow( arr[j]-mean, 2 );
			}
			return Math.sqrt( M2 / (N-1) );
		}
	});

	it( 'should return the current sample standard deviation if provided no arguments', function test() {
		var data = [ 2, 3, 1 ],
			stdev = incrstdev();
		for ( var i = 0; i < data.length; i++ ) {
			stdev( data[ i ] );
		}
		assert.strictEqual( stdev(), 1 );
	});

	it( 'should return 0 if number of increments less than 2', function test() {
		var data = [ 2 ],
			stdev = incrstdev();
		for ( var i = 0; i < data.length; i++ ) {
			stdev( data[ i ] );
		}
		assert.strictEqual( stdev(), 0 );
	});

});