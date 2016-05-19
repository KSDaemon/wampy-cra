wampy-cra.js
============

[WAMP][] Challenge Response Authentication plugin for [Wampy.js][].

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Code coverage][coveralls-image]][coveralls-url]
[![Dependency Status][depstat-image]][depstat-url]
[![DevDependency Status][depstat-dev-image]][depstat-dev-url]
[![MIT License][license-image]][license-url]

Description
===========

wampy-cra exposes 3 methods:

* derive_key(secret, salt, iterations = 1000, keylen = 32). Used to generate a derived key using PBKDF2 scheme.
* sign(key, challenge). Used to sign a challenge message, using a key, using SHA256 algorithm.
* **auto(secret)**. Probably the only function you need. Used to automatically detect needed algorythm to create a
signed message, using only secret key. This function can be passed as onChallenge callback.

See usage examples in Wampy.js docs section
["Challenge Response Authentication"](https://github.com/KSDaemon/wampy.js#challenge-response-authentication)


[Wampy.js]: https://github.com/KSDaemon/wampy.js
[WAMP]: http://wamp-proto.org/

[npm-url]: https://www.npmjs.com/package/wampy-cra
[npm-image]: https://img.shields.io/npm/v/wampy-cra.svg?style=flat

[travis-url]: https://travis-ci.org/KSDaemon/wampy-cra
[travis-image]: https://img.shields.io/travis/KSDaemon/wampy-cra/master.svg?style=flat

[coveralls-url]: https://coveralls.io/github/KSDaemon/wampy-cra
[coveralls-image]: https://img.shields.io/coveralls/KSDaemon/wampy-cra/master.svg?style=flat

[depstat-url]: https://david-dm.org/KSDaemon/wampy-cra
[depstat-image]: https://david-dm.org/KSDaemon/wampy-cra.svg?style=flat

[depstat-dev-url]: https://david-dm.org/KSDaemon/wampy-cra
[depstat-dev-image]: https://david-dm.org/KSDaemon/wampy-cra/master-status.svg?style=flat

[license-image]: https://img.shields.io/badge/license-MIT-blue.svg
[license-url]: http://opensource.org/licenses/MIT
