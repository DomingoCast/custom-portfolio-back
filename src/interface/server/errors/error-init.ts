const errorWithCodeAndMessage = (code: number, message: string) => {
    throw new Error(code + " " + message);
};
export default errorWithCodeAndMessage;
