/**
 * Created by KSDaemon on 19.05.16.
 */

const expect = require('chai').expect,
    wampyCra = require('../src/wampy-cra'),
    secret = 'secretKey',
    salt = 'secretSalt',
    challenge = '{"authrole": "commonuser", ' +
        '"authprovider": "static", ' +
        '"authmethod": "wampcra", ' +
        '"timestamp": "2016-05-19T09:30:32.177Z", ' +
        '"session": 6492709588079659, ' +
        '"authid": "joe", ' +
        '"nonce": "Z+UXH9Q8htepjpDYGAuwBQgeQTSX2W9eZrEJLFrr1ohVJVHjzIaxgw7niL6CsAQb"}';

describe('Wampy-cra plugin', function () {

    it('allows to sign challenge message with secret key using SHA256', function () {
        let res = wampyCra.signManual(secret, challenge);

        expect(res).to.be.equal('pKj6AlpNYn7QKqAZD0WctTVO+nxpSG1kT9muLzbv5Mo=');
    });

    it('allows to generate derived key using PBKDF2 scheme', function () {
        let res;

        res = wampyCra.deriveKey(secret, salt);
        expect(res).to.be.equal('PjhbMq82TzEZgl7/qKoUrk2ZdYl3sBciwBVSnE7ZCYM=');

        res = wampyCra.deriveKey(secret, salt, 500);
        expect(res).to.be.equal('t/+iDiMZLt/mFSzbtq7vJHdExA3FtBu0LukzpTFYBpI=');

        res = wampyCra.deriveKey(secret, salt, 2000, 16);
        expect(res).to.be.equal('ER8wnMRXtdNgY8tJ37FkhQ==');
    });

    it('allows to automatically detect requested WAMP auth method and produce signed message', function () {
        let res,
            auto = wampyCra.sign(secret),
            challengeInfo = {
                challenge : challenge,
                iterations: 100,
                salt      : salt,
                keylen    : 16
            };

        res = auto('wampcra', challengeInfo);
        expect(res).to.be.equal('W+wnbw5Uo9rkDIrQf1SSJue4JPzkqWQE89sO4qndUs4=');

        challengeInfo = {
            challenge : challenge
        };

        res = auto('wampcra', challengeInfo);
        expect(res).to.be.equal('pKj6AlpNYn7QKqAZD0WctTVO+nxpSG1kT9muLzbv5Mo=');
    });

    it('throws error while using auto method, if auth method is not recognized', function () {
        let auto = wampyCra.sign(secret),
            challengeInfo = {
                challenge : challenge,
                iterations: 100,
                salt      : salt,
                keylen    : 16
            };

        expect(function () { auto('notwampcra', challengeInfo); }).to.throw('Unknown authentication method requested!');

    });

});
