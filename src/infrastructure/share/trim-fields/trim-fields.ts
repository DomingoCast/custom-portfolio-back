const trimFields = <T>(objectToTrim: T, arrayExceptions: Array<string>): T => {
    const newObject = { ...objectToTrim };
    Object.keys(newObject).forEach((key: any) => {
        const param = newObject[key as keyof T];
        if (typeof param === "string" && !arrayExceptions.includes(key))
            newObject[key as keyof T] = <any>param.trim();
    });
    return newObject;
};

export default trimFields;
