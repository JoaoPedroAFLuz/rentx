import { AppError } from '@shared/errors/AppError';
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { CreateRentalUseCase } from './CreateRentalUseCase';

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;

describe('Create rental', () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
  });

  it('should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      user_id: '12345',
      car_id: '54321',
      expected_return_date: new Date(),
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not be able to create a new rental when user already has one', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '12345',
        car_id: '54321',
        expected_return_date: new Date(),
      });

      await createRentalUseCase.execute({
        user_id: '12345',
        car_id: '98765',
        expected_return_date: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental when car already has one', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '98765',
        car_id: '54321',
        expected_return_date: new Date(),
      });

      await createRentalUseCase.execute({
        user_id: '12345',
        car_id: '54321',
        expected_return_date: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
