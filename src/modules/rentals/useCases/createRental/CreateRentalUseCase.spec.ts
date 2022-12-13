import dayjs from 'dayjs';

import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/dateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';
import { CreateRentalUseCase } from './CreateRentalUseCase';

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let createRentalUseCase: CreateRentalUseCase;

describe('Create rental', () => {
  const nowAdd24Hours = dayjs().add(1, 'day').toDate();
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider
    );
  });

  it('should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      user_id: '12345',
      car_id: '54321',
      expected_return_date: nowAdd24Hours,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not be able to create a new rental with return date of less than 24 hours', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '98765',
        car_id: '54321',
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental when user already has one', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '12345',
        car_id: '54321',
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
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '98765',
        car_id: '54321',
        expected_return_date: nowAdd24Hours,
      });

      await createRentalUseCase.execute({
        user_id: '12345',
        car_id: '54321',
        expected_return_date: nowAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
