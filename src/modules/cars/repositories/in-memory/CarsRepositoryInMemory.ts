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

  async findById(id: string): Promise<Car> {
    return this.cars.find((car) => car.id === id);
  }

  async findByName(name: string): Promise<Car> {
    return this.cars.find((car) => car.name === name);
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }

  async create(data: ICreateCarDTO): Promise<Car> {
    const newCar = new Car();

    Object.assign(newCar, data);

    this.cars.push(newCar);

    return newCar;
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    const car = await this.findById(id);

    car.available = available;
  }
}

export { CarsRepositoryInMemory };
