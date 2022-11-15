import crypto from 'crypto-js/core'
import PBKDF2 from 'crypto-js/pbkdf2'
import SHA256 from 'crypto-js/sha256'
import Base64 from 'crypto-js/enc-base64';
import HmacSHA256 from 'crypto-js/hmac-sha256';

import { setCrypto, deriveKey, sign, signManual } from './wampy-cra';

const cryptoObj = {
    PBKDF2,
    algo: {
        SHA256: crypto.algo.SHA256
    },
    enc: crypto.enc,
    HmacSHA256
};

setCrypto(cryptoObj);

export {
    deriveKey,
    sign,
    signManual
};
