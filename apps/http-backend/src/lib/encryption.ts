import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

export class TokenEncryption {
    private algorithm: 'aes-256-gcm' = 'aes-256-gcm';
    private encryptionKey: Buffer;

    constructor(key: string) {
        this.encryptionKey = Buffer.from(key, 'hex');

        if (this.encryptionKey.length !== 32) {
            throw new Error('Invalid encryption key');
        }
    }

    static generateKey(): string {
        return randomBytes(32).toString('hex');
    }

    encrypt(token: string): EncryptedToken {
        const iv = randomBytes(16);

        const cipher = createCipheriv(this.algorithm, this.encryptionKey, iv);

        let encryptedToken = cipher.update(token, 'utf8', 'base64');
        encryptedToken += cipher.final('base64');

        const authTag = cipher.getAuthTag();

        return {
            encryptedToken,
            iv: iv.toString('hex'),
            authTag: authTag.toString('hex'),
        };
    }

    decrypt(encryptedToken: EncryptedToken): string {
        const iv = Buffer.from(encryptedToken.iv, 'hex');
        const authTag = Buffer.from(encryptedToken.authTag, 'hex');

        const decipher = createDecipheriv(
            this.algorithm,
            this.encryptionKey,
            iv
        );

        decipher.setAuthTag(authTag);

        let decryptedToken = decipher.update(
            encryptedToken.encryptedToken,
            'base64',
            'utf8'
        );
        decryptedToken += decipher.final('utf8');

        return decryptedToken;
    }
}

export interface EncryptedToken {
    encryptedToken: string;
    iv: string;
    authTag: string;
}
