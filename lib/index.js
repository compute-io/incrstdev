/**
*
*	COMPUTE: incrstdev
*
*
*	DESCRIPTION:
*		- Provides a method to compute a sample standard deviation incrementally.
*
*
*	NOTES:
*		[1] 
*
*
*	TODO:
*		[1] 
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2014.
*
*/

(function() {
	'use strict';

	// INCREMENTAL //

	/**
	* FUNCTION: incrstdev()
	*	Returns a method to compute the sample standard deviation incrementally.
	*
	* @returns {Function} method to compute the sample standard deviation incrementally
	*/
	function incrstdev() {
		var mu = 0,
			N = 0,
			M2 = 0,
			delta;
		/**
		* FUNCTION: incrstdev( [value] )
		*	If a `value` is provided, updates and returns the updated sample standard deviation. If no `value` is provided, returns the current sample standard deviation.
		*
		* @param {Number} [value] - value used to update the sample standard deviation
		* @returns {Number} sample standard deviation
		*/
		return function incrstdev( x ) {
			if ( !arguments.length ) {
				if ( N < 2 ) {
					return 0;
				}
				return Math.sqrt( M2 / (N-1) );
			}
			N += 1;
			delta = x - mu;
			mu += delta / N;
			M2 += delta * ( x - mu );
			if ( N < 2 ) {
				return 0;
			}
			return Math.sqrt( M2 / (N-1) );
		};
	} // end FUNCTION incrstdev()


	// EXPORTS //

	module.exports = incrstdev;

})();