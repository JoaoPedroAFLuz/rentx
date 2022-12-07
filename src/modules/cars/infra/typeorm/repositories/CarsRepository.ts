import { getRepository, Repository } from 'typeorm';

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { Car } from '../entities/Car';

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async findAvailable(
    name: string,
    brand: string,
    category_id: string
  ): Promise<Car[]> {
    const carsQuery = this.repository
      .createQueryBuilder('cars')
      .where('available = :available', { available: true });

    if (name) {
      carsQuery.andWhere('cars.name = :name', { name });
    }

    if (brand) {
      carsQuery.andWhere('cars.brand = :brand', { brand });
    }

    if (category_id) {
      carsQuery.andWhere('cars.category_id = :category_id', { category_id });
    }

    return await carsQuery.getMany();
  }

  async findById(id: string): Promise<Car> {
    return await this.repository.findOne(id);
  }

  async findByName(name: string): Promise<Car> {
    return await this.repository.findOne({ name });
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return await this.repository.findOne({ license_plate });
  }

  async create(data: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create(data);

    await this.repository.save(car);

    return car;
  }
}

export { CarsRepository };
