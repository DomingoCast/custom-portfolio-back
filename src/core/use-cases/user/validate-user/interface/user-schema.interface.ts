export interface UserSchema {
    type: string;
    required: string[];
    properties: {
        name: {
            type: string;
            minLength: number;
            maxLength: number;
            errorMessage: string;
        };
        surname: {
            type: string;
            minLength: number;
            maxLength: number;
            errorMessage: string;
        };
        email: {
            type: string;
            format: string;
            errorMessage: string;
        };
        password: {
            type: string;
            minLength: number;
            maxLength: number;
            errorMessage: string;
        };
        phone: {
            type: string;
            minLength: number;
            maxLength: number;
            pattern: string;
            errorMessage: string;
        };
        address: {
            type: string;
            minLength: number;
            maxLength: number;
        };
    };
}
