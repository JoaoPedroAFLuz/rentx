import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';
import {
  ICreateSpecificationDTO,
  ISpecificationRepository,
} from '@modules/cars/repositories/ISpecificationsRepository';

class SpecificationsRepositoryInMemory implements ISpecificationRepository {
  specifications: Specification[] = [];

  async findByName(name: string): Promise<Specification> {
    return this.specifications.find(
      (specification) => specification.name === name
    );
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    return this.specifications.filter((specification) =>
      ids.includes(specification.id)
    );
  }

  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const newSpecification = new Specification();

    Object.assign(newSpecification, { name, description });

    this.specifications.push(newSpecification);

    return newSpecification;
  }
}

export { SpecificationsRepositoryInMemory };
