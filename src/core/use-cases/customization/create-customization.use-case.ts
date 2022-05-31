import { Customization } from "../../domain/customization/customization";
import CollectionRepository from "../../ports/collection-repository.port";
import CustomizationRepository from "../../ports/customization-repository.port";

type CreateCustomizationUseCaseProps = {
    customizationRepository: CustomizationRepository;
    collectionRepository: CollectionRepository;
};
type CreateCustomizationUseCase = (
    customization: Omit<Customization, "id" | "customizations">
) => Promise<Customization | null>;

const registerUserUseCase =
    ({
        customizationRepository,
    }: CreateCustomizationUseCaseProps): CreateCustomizationUseCase =>
    async (
        customization: Omit<Customization, "id" | "customizations">
    ): Promise<Customization | null> => {
        return await customizationRepository.persist(customization);
    };

export default registerUserUseCase;
