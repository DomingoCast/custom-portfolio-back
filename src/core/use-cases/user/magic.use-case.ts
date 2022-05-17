type MagicUseCaseProps = {
    accessToken: AccesToken;
};
type MagicUseCase = (user: RegisterInfo) => Promise<User | null>;

const registerUserUseCase =
    ({ accessToken }: MagicUseCaseProps): MagicUseCase =>
    async (user: RegisterInfo, role = Role.worker): Promise<User | null> => {
        const decoded = container.accessToken.verify(token);
        if (decoded.data.changePassword)
            return res.status(400).send({
                message: "you need to change the password",
                token: token,
            });
    };
