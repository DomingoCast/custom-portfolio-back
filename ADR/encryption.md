# PASSWORD ENCRYPTION

The safest way to store passwords is not to encrypt the password but to hash it because encryption is a two-way function meaning that it can be reversed and hashing is not. There most popular hashing functions like sha and blake2 cannot be used for hashing passwords. SHA256 and SHA512 are message digests, they were never meant to be password-hashing (or key-derivation) functions. A password-hashing function should defend against dictionary attacks and rainbow tables. In order to defend against dictionary attacks, a password hashing scheme must include a work factor to make it as slow as is workable.

---

## Password-hasshing functions

The most popular functions to hash passwords are:

-   bcrypt: based on the Blowfish cipher and presented at USENIX in 1999.Incorporates a salt to protect against rainbow table.
-   Argon2: nternally built upon Blake2. Winner of the Password Hashing Competition

---

## Owasp recommendations

-   Use Argon2id with a minimum configuration of 15 MiB of memory, an iteration count of 2, and 1 degree of parallelism.
-   If Argon2id is not available, use bcrypt with a work factor of 10 or more and with a password limit of 72 bytes.

---

## Libraries

The 2 most used `crypto-js` and `bcrypt` don't use argon2 but luckily exists a library called `argon2` that although not as popular, is still widely used and frequently updated

---

## DECISSION: ARGON2

In terms of the best password-hashing functions it is widely accepted and recommended to use argon2. Because there's a popular library that used this function I think that this is in fact the best option for our project
