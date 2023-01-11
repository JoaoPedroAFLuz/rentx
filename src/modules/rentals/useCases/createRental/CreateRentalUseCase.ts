import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { ICreateRentalDTO } from '@modules/rentals/dtos/CreateRentalDTO';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { IDateProvider } from '@shared/container/providers/dateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute({
    user_id,
    car_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rentalMinimumHours = 24;

    const compare = this.dateProvider.compare(
      this.dateProvider.dateNow(),
      expected_return_date
    );

    if (compare < rentalMinimumHours) {
      throw new AppError('Rental must have at least 24 hours');
    }

    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
      car_id
    );

    if (carUnavailable) {
      throw new AppError('Car is unavailable');
    }

    const userHasOpenRental = await this.rentalsRepository.findOpenRentalByUser(
      user_id
    );

    if (userHasOpenRental) {
      throw new AppError('User already have an open rental');
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    await this.carsRepository.updateAvailable(car_id, false);

    return rental;
  }
}

export { CreateRentalUseCase };
