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

const isNode = (typeof process === 'object' && Object.prototype.toString.call(process) === '[object process]');
let crypto;

export function setCrypto(lib) {
    crypto = lib;
}

export function deriveKey(secret, salt, iterations = 1000, keylen = 32) {
    let key;

    if (isNode) {
        key = crypto.pbkdf2Sync(secret, salt, iterations, keylen, 'sha256');
        return key.toString('base64');
    } else {
        let config = {
            keySize: keylen / 4,
            iterations: iterations,
            hasher: crypto.algo.SHA256
        };

        key = crypto.PBKDF2(secret, salt, config);
        return key.toString(crypto.enc.Base64);
    }
}

export function signManual(key, challenge) {
    if (isNode) {
        let hmac = crypto.createHmac('sha256', key);
        hmac.update(challenge);
        return hmac.digest('base64');
    } else {
        return crypto.HmacSHA256(challenge, key).toString(crypto.enc.Base64);
    }
}

export function sign(secret) {

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
