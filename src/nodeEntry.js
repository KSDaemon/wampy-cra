import crypto from 'crypto';
import { setCrypto, deriveKey, sign, signManual } from './wampy-cra';

setCrypto(crypto);

export {
    deriveKey,
    sign,
    signManual
};
