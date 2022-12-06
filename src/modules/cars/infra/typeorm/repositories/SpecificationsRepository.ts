import { getRepository, Repository } from 'typeorm';

import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';
import {
  ICreateSpecificationDTO,
  ISpecificationRepository,
} from '@modules/cars/repositories/ISpecificationsRepository';

class SpecificationsRepository implements ISpecificationRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({ name });

    return specification;
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const newSpecification = this.repository.create({
      name,
      description,
    });

    await this.repository.save(newSpecification);
  }
}

export { SpecificationsRepository };
