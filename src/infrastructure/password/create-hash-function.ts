import HashFunction from "../../core/ports/hash-function.port";
const bcrypt = require("bcryptjs");
const createHashFunction = (): HashFunction => {
    const saltRounds = 10;

    const hash = async (password: string) => {
        try {
            return await bcrypt.hash(password, saltRounds);
        } catch (error) {
            console.error(error);
            return "error";
        }
    };
    const verify = async (hashed: string, password: string) => {
        try {
            return await bcrypt.compare(password, hashed);
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
