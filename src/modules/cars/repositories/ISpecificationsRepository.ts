import { Specification } from "../model/Specification";

// DTO => Data tranfer object
interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationRepository {
  create({ name, description }: ICreateSpecificationDTO): void;
  findByName(name: string): Specification | undefined;
}

export { ISpecificationRepository, ICreateSpecificationDTO };
