import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

interface IRequest {
  name?: string;
  brand?: string;
  category_id?: string;
}

class ListAvailableCarsUseCase {
  constructor(private carsRepository: ICarsRepository) {}

  async execute({ name, brand, category_id }: IRequest): Promise<Car[]> {
    return await this.carsRepository.findAvailable(name, brand, category_id);
  }
}

export { ListAvailableCarsUseCase };
