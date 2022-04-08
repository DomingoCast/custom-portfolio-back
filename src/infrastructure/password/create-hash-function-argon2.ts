import HashFunction from "../../core/ports/hash-function.port";
import argon2 from "argon2";

const createHashFunction = (): HashFunction => {
    const hash = async (password: string) => {
        return await argon2.hash(password, { type: argon2.argon2id });
    };
    const verify = async (hashed: string, password: string) => {
        const response = await argon2.verify(hashed, password);
        return response;
    };
    return {
        hash,
        verify,
    };
};

export default createHashFunction;
