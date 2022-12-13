import { Repository, getRepository } from 'typeorm';
import { ICreateRentalDTO } from '@modules/rentals/dtos/CreateRentalDTO';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { Rental } from '../entities/Rental';

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return await this.repository.findOne({ car_id });
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return await this.repository.findOne({ user_id });
  }

  async create(data: ICreateRentalDTO): Promise<Rental> {
    const newRental = this.repository.create(data);

    return await this.repository.save(newRental);
  }
}

export { RentalsRepository };
