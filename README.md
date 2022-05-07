wampy-cra.js
============

[WAMP][] Challenge Response Authentication plugin for [Wampy.js][].

[![NPM version][npm-image]][npm-url]
[![Build Status][gh-build-test-image]][gh-build-test-url]
[![Code coverage][coveralls-image]][coveralls-url]
[![MIT License][license-image]][license-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]

Description
===========

wampy-cra exposes 3 methods:

* derive_key(secret, salt, iterations = 1000, keylen = 32). Used to generate a derived key using PBKDF2 scheme.
* sign(key, challenge). Used to sign a challenge message, using a key, using SHA256 algorithm.
* **auto(secret)**. Probably the only function you need. Used to automatically detect needed algorythm to create a
signed message, using only secret key. This function can be passed as onChallenge callback.

See usage examples in Wampy.js docs section
["Challenge Response Authentication"](https://github.com/KSDaemon/wampy.js#challenge-response-authentication)

Thanks JetBrains for the best IDEs and support for open source!

[![jetbrains logo]][jetbrains url]

[Wampy.js]: https://github.com/KSDaemon/wampy.js
[WAMP]: http://wamp-proto.org/

[npm-url]: https://www.npmjs.com/package/wampy-cra
[npm-image]: https://img.shields.io/npm/v/wampy-cra.svg?style=flat

[gh-build-test-url]: https://github.com/KSDaemon/wampy-cra/actions/workflows/build-and-test.yml
[gh-build-test-image]: https://github.com/KSDaemon/wampy-cra/actions/workflows/build-and-test.yml/badge.svg

[coveralls-url]: https://coveralls.io/github/KSDaemon/wampy-cra
[coveralls-image]: https://img.shields.io/coveralls/KSDaemon/wampy-cra/master.svg?style=flat

[license-image]: https://img.shields.io/badge/license-MIT-blue.svg
[license-url]: http://opensource.org/licenses/MIT

[snyk-image]: https://snyk.io/test/github/KSDaemon/wampy-cra/badge.svg?targetFile=package.json
[snyk-url]: https://snyk.io/test/github/KSDaemon/wampy-cra?targetFile=package.json

[jetbrains logo]: jetbrains.svg
[jetbrains url]: (https://www.jetbrains.com)




