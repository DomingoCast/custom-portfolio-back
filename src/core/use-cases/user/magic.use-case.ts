import UnauthorizedError from "../../errors/unauthorized.error";
import AccessToken from "../../ports/access-token.port";

type MagicUseCaseProps = {
    accessToken: AccessToken;
};
type MagicUseCase = (token: string) => Promise<boolean | void>;

export const magicUseCase =
    ({ accessToken }: MagicUseCaseProps): MagicUseCase =>
    async (token: string): Promise<boolean> => {
        try {
            const decoded = accessToken.verify(token) as {
                data: {
                    changePassword: boolean;
                };
            };
            if (decoded.data.changePassword) return false;
        } catch (e) {
            throw new UnauthorizedError("Wrong token");
        }

        return true;
    };
