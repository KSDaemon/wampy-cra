"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

/**
 * Project: wampy-cra.js
 *
 * https://github.com/KSDaemon/wampy-cra
 *
 * Wampy.js Challenge Response Authentication plugin
 *
 * Copyright 2016 KSDaemon. Licensed under the MIT License.
 * See @license text at http://www.opensource.org/licenses/mit-license.php
 *
 */
// Module boilerplate to support browser globals and browserify and AMD.
(typeof define === 'function' ? function (m) {
  define('WampyCra', m);
} : (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' ? function (m) {
  module.exports = m();
} : function (m) {
  this.WampyCra = m();
})(function () {
  var WampyCra = {},
      isNode = (typeof process === "undefined" ? "undefined" : _typeof(process)) === 'object' && Object.prototype.toString.call(process) === '[object process]',
      crypto = isNode ? require('crypto') : require('crypto-js');

  function deriveKey(secret, salt) {
    var iterations = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1000;
    var keylen = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 32;
    var key;

    if (isNode) {
      key = crypto.pbkdf2Sync(secret, salt, iterations, keylen, 'sha256');
      return key.toString('base64');
    } else {
      var config = {
        keySize: keylen / 4,
        iterations: iterations,
        hasher: crypto.algo.SHA256
      };
      key = crypto.PBKDF2(secret, salt, config);
      return key.toString(crypto.enc.Base64);
    }
  }

  function signManual(key, challenge) {
    if (isNode) {
      var hmac = crypto.createHmac('sha256', key);
      hmac.update(challenge);
      return hmac.digest('base64');
    } else {
      return crypto.HmacSHA256(challenge, key).toString(crypto.enc.Base64);
    }
  }

  function sign(secret) {
    return function (method, info) {
      if (method === 'wampcra') {
        if (info.salt) {
          return signManual(deriveKey(secret, info.salt, info.iterations, info.keylen), info.challenge);
        } else {
          return signManual(secret, info.challenge);
        }
      } else {
        throw new Error('Unknown authentication method requested!');
      }
    };
  }

  WampyCra.deriveKey = deriveKey;
  WampyCra.signManual = signManual;
  WampyCra.sign = sign;
  return WampyCra;
});
//# sourceMappingURL=wampy-cra.js.map
