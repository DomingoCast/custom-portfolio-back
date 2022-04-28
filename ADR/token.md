# Jason Web Token

JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed. JWTs can be signed using a secret (with the HMAC algorithm) or a public/private key pair using RSA or ECDSA.

## Structure

In its compact form, JSON Web Tokens consist of three parts separated by dots (.), which are:

-   Header
-   Payload
-   Signature

Therefore, a JWT typically looks like the following:

`xxxxx.yyyyy.zzzzz`

## Library

From quick search I've found that the most used library for jwt is `jsonwebtoken`, it's not ben updated for some time but neither have its competitors.

### Usage

```bash
import jwt from "jsonwebtoken");
const token = jwt.sign({ exp: expirationDate, data: value  }, secret);
```
