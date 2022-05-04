import { RegisterInfo } from "../../../core/domain/user/register-info";

const trimFields = (
    objectToTrim: RegisterInfo,
    arrayExceptions: Array<string>
): RegisterInfo => {
    const newObject = { ...objectToTrim };
    Object.keys(newObject).forEach((key: any) => {
        if (!arrayExceptions.includes(key)) {
            newObject[key as keyof RegisterInfo] = <string>(
                newObject[key as keyof RegisterInfo].trim()
            );
        }
    });
    return newObject;
};

export default trimFields;
