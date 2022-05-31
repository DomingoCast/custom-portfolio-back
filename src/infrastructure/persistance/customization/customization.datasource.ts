import { Customization } from "../../../core/domain/customization/customization";
import CustomizationModel from "./customization.model";
import { dataSource } from "../datasource";
import CustomizationRepository from "../../../core/ports/customization-repository.port";

const createCustomizationRepository = (): CustomizationRepository => {
    const customizationRepository =
        dataSource.getRepository(CustomizationModel);
    const getByCollection = (
        collectionId: string
    ): Promise<Customization[] | any> => {
        return customizationRepository
            .find({ where: { collection: { id: collectionId } } as any })
            .then((res: Customization[]) => res)
            .catch((e) => console.log("[joder]"));
    };
    const persist = (customization: Omit<Customization, "id">) => {
        return customizationRepository
            .save(customization)
            .then((res: Customization) => res)
            .catch((e) => null);
    };
    return {
        persist,
        getByCollection,
    };
};

export default createCustomizationRepository;
