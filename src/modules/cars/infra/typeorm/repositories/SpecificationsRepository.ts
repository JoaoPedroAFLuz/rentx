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

  async findByIds(ids: string[]): Promise<Specification[]> {
    return await this.repository.findByIds(ids);
  }

  async findByName(name: string): Promise<Specification> {
    return await this.repository.findOne({ name });
  }

  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const newSpecification = this.repository.create({
      name,
      description,
    });

    return await this.repository.save(newSpecification);
  }
}

export { SpecificationsRepository };
