import HashFunction from "../../core/ports/hash-function.port";
const bcrypt = require("bcryptjs");
const createHashFunction = (): HashFunction => {
    const saltRounds = 10;

    const hash = async (password: string): Promise<string> => {
        return await bcrypt.hash(password, saltRounds);
    };
    const verify = async (
        hashed: string,
        password: string
    ): Promise<boolean> => {
        return await bcrypt.compare(password, hashed);
    };
    return {
        hash,
        verify,
    };
};

export default createHashFunction;
