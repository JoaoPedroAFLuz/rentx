import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { AppError } from '@shared/errors/AppError';
interface IRequest {
  car_id: string;
  specifications_id: string[];
}

class CreateCarSpecificationsUseCase {
  constructor(
    private carsRepository: ICarsRepository,
    private specificationsRepository: ISpecificationRepository
  ) {}

  async execute({ car_id, specifications_id }: IRequest): Promise<Car> {
    const car = await this.carsRepository.findById(car_id);

    if (!car) {
      throw new AppError('Car not found', 404);
    }

    const specifications = await this.specificationsRepository.findByIds(
      specifications_id
    );

    car.specifications = specifications;

    return await this.carsRepository.create(car);
  }
}

export { CreateCarSpecificationsUseCase };
