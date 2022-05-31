import { Customization } from "../domain/customization/customization";

interface CustomizationRepository {
    persist(user: Omit<Customization, "id">): Promise<null | Customization>;
    getByCollection(collectionId: string): Promise<null | Customization[]>;
}
export default CustomizationRepository;
