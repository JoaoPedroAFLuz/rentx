import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { Repository, getRepository } from 'typeorm';
import { Car } from '../entities/Car';

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  findAvailable(
    name: string,
    brand: string,
    category_id: string
  ): Promise<Car[]> {
    throw new Error('Method not implemented.');
  }

  async findByName(name: string): Promise<Car> {
    return await this.repository.findOne({ name });
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return await this.repository.findOne({ license_plate });
  }

  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    });

    await this.repository.save(car);

    return car;
  }
}

export { CarsRepository };
