import arrayExceptions from "./array-exceptions";
const trimFields = (object: any): any => {
    const newObject = { ...object };
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
