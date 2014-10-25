var incrstdev = require( './../lib' );

// Initialize a method to calculate the sample standard deviation incrementally:
var stdev = incrstdev();

// Simulate some data...
var value, sigma;

console.log( '\nValue\tSigma\n' );

for ( var i = 0; i < 100; i++ ) {

	value = Math.random() * 100;
	sigma = stdev( value );

	console.log( '%d\t%d', value.toFixed( 4 ), sigma.toFixed( 4 ) );
}

// Final sample standard deviation:
console.log( '\nFinal sample standard deviation is %d...\n', stdev() );
