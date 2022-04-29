const trimFields = (object: any): any => {
    const newObject = { ...object };
    Object.keys(newObject).forEach((key) => {
        if (typeof newObject[key] === "string") {
            if (key !== "password") {
                newObject[key] = newObject[key].trim();
            }
        }
    });
    return newObject;
};

export default trimFields;
