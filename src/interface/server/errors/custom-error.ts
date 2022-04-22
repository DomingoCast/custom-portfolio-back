class CustomError extends Error {
    constructor() {
        super();
        throw new Error("An error had occurred");
    }
}
export default CustomError;
