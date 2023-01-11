import dayjs from 'dayjs';

import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/dateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';
import { CreateRentalUseCase } from './CreateRentalUseCase';

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let createRentalUseCase: CreateRentalUseCase;

describe('Create rental', () => {
  const nowAdd24Hours = dayjs().add(1, 'day').toDate();
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      carsRepositoryInMemory,
      dayjsDateProvider
    );
  });

  it('should be able to create a new rental', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Test',
      description: 'Car Test',
      daily_rate: 100,
      license_plate: 'ABC-1D23',
      brand: 'Car Brand',
      category_id: '12345',
      fine_amount: 50,
    });

    const rental = await createRentalUseCase.execute({
      user_id: '12345',
      car_id: car.id,
      expected_return_date: nowAdd24Hours,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
    expect(car.available).toBe(false);
  });

  it('should not be able to create a new rental with return date of less than 24 hours', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '98765',
        car_id: '1234',
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental when user already has one', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Test',
      description: 'Car Test',
      daily_rate: 100,
      license_plate: 'ABC-1D23',
      brand: 'Car Brand',
      category_id: '12345',
      fine_amount: 50,
    });

    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '12345',
        car_id: car.id,
        expected_return_date: nowAdd24Hours,
      });

      await createRentalUseCase.execute({
        user_id: '12345',
        car_id: '98765',
        expected_return_date: nowAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental when car already has one', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Test',
      description: 'Car Test',
      daily_rate: 100,
      license_plate: 'ABC-1D23',
      brand: 'Car Brand',
      category_id: '12345',
      fine_amount: 50,
    });

    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '98765',
        car_id: car.id,
        expected_return_date: nowAdd24Hours,
      });

      await createRentalUseCase.execute({
        user_id: '12345',
        car_id: car.id,
        expected_return_date: nowAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
