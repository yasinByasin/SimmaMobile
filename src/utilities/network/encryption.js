import '../../../shim';
import crypto from 'crypto';
//mport publicKey from '../assets/cert/public.pem';
const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA7MQBMwQcrq65wxAlVLe7
4TWT/qriT1fNPZ5bIE6tEeGlPQIXwkyoH0dk4kXubrFDeDnfwgA5NTn2RXdXHC0x
y1QQQYaQxmAUrCR0d6qYSXXHG0xDXRcjFRjU0JM+Z4+pW+119ovNeUjHEhvzHjht
R4UQxCWk47IKCWB2ES6NXe6Hc7G3E4bxxpqfOha+YehqJhW136M22vc5SjT89tbE
jDzy2cVGrhc0tW7Cvlw3J+dPWQw2zbFpx/M2aUoOC8sSY/TELLsTR5X7Ypas7ydI
40nXIiOQN+v6w9ux+aFx/QS8QttOzNDszSvy81oq6mwHx9EYySh+X4N0tNW0HXKF
8QIDAQAB
-----END PUBLIC KEY-----
`;

const DEFAULT_VECTOR = '62250c420de42707dfd41059';

encryptStringWithRsaPublicKey = (toEncrypt) => {

  const buffer = typeof toEncrypt == 'string' ? Buffer.from(toEncrypt) : toEncrypt;
  return crypto.publicEncrypt({
    passphrase: 'simma',
    key: publicKey,
    type: 'pkcs1',
    format: 'pem',
    cipher: 'aes-256-cbc',
    padding: 1
  }, buffer);
}

export const encryptData = (message = `This is a secret`, vector = DEFAULT_VECTOR) => {
  const algorithm = "aes-256-cbc";
  const securitykey = crypto.randomBytes(32);
  const initVector = Buffer.from(vector.slice(-16));
  const encryptedSecuritykey = encryptStringWithRsaPublicKey(securitykey);
  const cipher = crypto.createCipheriv(algorithm, securitykey, initVector);
  let encryptedData = cipher.update(message, "utf-8", "hex");
  encryptedData += cipher.final("hex");
  const finalData = Buffer.concat([encryptedSecuritykey, Buffer.from(encryptedData)]);
  return finalData.toString('base64');
}
