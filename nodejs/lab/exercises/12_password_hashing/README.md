# Drill 12: Secure Password Hashing & Salting (Q45)

## Problem Statement
Plain text and fast cryptographic hashes (MD5, SHA-256) are vulnerable to rainbow table attacks and GPU cracking. Adaptive hashes like bcrypt introduce salt and cost work factors.

## Task
Implement `hashPassword(plainText, saltRounds = 10)` and `verifyPassword(plainText, hash)` in `starter.js` using `bcryptjs`.

## Hint
Master Answer Reference: [06-rest-apis-and-security.md](../../answers/06-rest-apis-and-security.md#45-how-do-you-store-passwords-securely-bcrypt-or-argon2-salting-and-why-are-plain-text-or-fast-hashes-like-md5-and-sha-256-unsafe)
