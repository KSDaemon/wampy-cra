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
    } :
        typeof exports === 'object' ? function (m) {
            module.exports = m();
        } :
            function (m) {
                this.WampyCra = m();
            }
)(function () {

    const WampyCra = {},
        isNode = (typeof process === 'object' && Object.prototype.toString.call(process) === '[object process]'),
        crypto = isNode ? require('crypto') : require('crypto-js');

    WampyCra.derive_key = function (secret, salt, iterations = 1000, keylen = 32) {
        let key;

        if (isNode) {
            key = crypto.pbkdf2Sync(secret, salt, iterations, keylen, 'sha256');
            return key.toString('base64');
        } else {
            let config = {
                keySize   : keylen / 4,
                iterations: iterations,
                hasher    : crypto.algo.SHA256
            };

            key = crypto.PBKDF2(secret, salt, config);
            return key.toString(crypto.enc.Base64);
        }
    };

    WampyCra.sign = function (key, challenge) {
        if (isNode) {
            let hmac = crypto.createHmac('sha256', key);
            hmac.update(challenge);
            return hmac.digest('base64');
        } else {
            return crypto.HmacSHA256(challenge, key).toString(crypto.enc.Base64);
        }
    };

    return WampyCra;

});
