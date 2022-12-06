import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';

interface ICarsRepository {
  findByName(name: string): Promise<Car>;

  findByLicensePlate(license_plate: string): Promise<Car>;

  create(data: ICreateCarDTO): Promise<Car>;
}

export { ICarsRepository };
