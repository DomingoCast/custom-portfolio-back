import UnauthorizedError from "../../errors/unauthorized.error";
import AccessToken from "../../ports/access-token.port";

type MagicUseCaseProps = {
    accessToken: AccessToken;
};
type MagicUseCase = (token: string) => boolean | void;

export const magicUseCase =
    ({ accessToken }: MagicUseCaseProps): MagicUseCase =>
    (token: string): boolean => {
        try {
            const decoded = accessToken.verify(token) as {
                data: {
                    changePassword: boolean;
                };
            };
            if (decoded.data.changePassword) return false;
        } catch (_error) {
            throw new UnauthorizedError("Wrong token");
        }

        return true;
    };
