import HashFunction from "../../core/ports/hash-function.port";
import argon2 from "argon2";

const createHashFunction = (): HashFunction => {
    const hash = async (password: string) => {
        try {
            return await argon2.hash(password, { type: argon2.argon2id });
        } catch (error) {
            console.error(error);
            return "error";
        }
    };
    const verify = async (hashed: string, password: string) => {
        try {
            const response = await argon2.verify(hashed, password);
            return response;
        } catch (error) {
            console.error(error);
            return false;
        }
    };
    return {
        hash,
        verify,
    };
};

export default createHashFunction;
