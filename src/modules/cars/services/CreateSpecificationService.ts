import { ISpecificationRepository } from './../repositories/ISpecificationsRepository';

interface IRequest {
  name: string;
  description: string;
}

export class CreateSpecificationService {
  constructor(private specificationsRepository: ISpecificationRepository) {}

  execute({ name, description }: IRequest) {
    const specification = this.specificationsRepository.findByName(name);

    if (specification) {
      throw new Error('Specification already exists');
    }

    this.specificationsRepository.create({ name, description });
  }
}
