import { Response } from "express";

const errorWithCodeAndMessage = (
    res: Response,
    code: number,
    message: string
) => {
    throw new Error("esto es un error");
    // return res.status(code).send({ message: message });
};
export default errorWithCodeAndMessage;
