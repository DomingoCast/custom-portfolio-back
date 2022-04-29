import arrayExceptions from "./array-exceptions";
const trimFields = (objectToTrim: object): any => {
    const newObject: { [key: string]: string } = { ...objectToTrim };
    Object.keys(newObject).forEach((key) => {
        if (typeof newObject[key] === "string") {
            if (!arrayExceptions.includes(key)) {
                newObject[key] = newObject[key].trim();
            }
        }
    });
    return newObject;
};

export default trimFields;
