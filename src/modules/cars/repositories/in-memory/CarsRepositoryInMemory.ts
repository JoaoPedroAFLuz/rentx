import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '../ICarsRepository';

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async findAvailable(
    name?: string,
    brand?: string,
    category_id?: string
  ): Promise<Car[]> {
    return this.cars.filter(
      (car) =>
        car.available &&
        (!name || car.name === name) &&
        (!brand || car.brand === brand) &&
        (!category_id || car.category_id === category_id)
    );
  }

  async findByName(name: string): Promise<Car> {
    return this.cars.find((car) => car.name === name);
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
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
    const newCar = new Car();

    Object.assign(newCar, {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    });

    this.cars.push(newCar);

    return newCar;
  }
}

export { CarsRepositoryInMemory };
