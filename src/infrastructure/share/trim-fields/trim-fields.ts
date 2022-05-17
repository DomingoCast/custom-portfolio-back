const trimFields = <T extends object = object>(
    objectToTrim: T,
    arrayExceptions: Array<string>
): T => {
    const newObject = { ...objectToTrim };
    Object.keys(newObject).forEach((key: string) => {
        const param: unknown = newObject[key as keyof T];
        if (typeof param === "string" && !arrayExceptions.includes(key))
            (newObject[key as keyof T] as unknown) = param.trim();
    });
    return newObject;
};

export default trimFields;
