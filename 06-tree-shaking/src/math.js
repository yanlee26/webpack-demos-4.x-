export function square(x) {
  return x * x;
}

export function cube(x) {
  return x * x * x;
}

/**
 * "use strict";
/* unused harmony export square */
/* harmony export (binding)  __webpack_require__.d(__webpack_exports__, "a", function() { return cube; });
function square(x) {
    return x * x;
  }
  
  function cube(x) {
    return x * x * x;
  }

 */

 /**
  * cube function (function r(e){return e*e*e}n.a=r).
  * `//webpack.config.js
  * mode: 'production'
  * `
  * 
  * `//package.json
  *   "sideEffects": false,
  * `
  */