import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { CreateCarUseCase } from './CreateCarUseCase';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;

describe('Create car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car name',
      description: 'Car description',
      daily_rate: 75.5,
      license_plate: 'ABC-12D3',
      fine_amount: 150.0,
      brand: 'Car brand',
      category_id: '',
    });

    const carByLicensePlate = await carsRepositoryInMemory.findByLicensePlate(
      car.license_plate
    );

    expect(carByLicensePlate).toHaveProperty('id');
  });

  it('should not be able to create a new car with a license plate already in use', async () => {
    await createCarUseCase.execute({
      name: 'Car 1 name',
      description: 'Car 2 description',
      daily_rate: 75.5,
      license_plate: 'ABC-12D3',
      fine_amount: 150.0,
      brand: 'Car 1 brand',
      category_id: '',
    });

    await expect(
      createCarUseCase.execute({
        name: 'Car 2 name',
        description: 'Car 2 description',
        daily_rate: 80,
        license_plate: 'ABC-12D3',
        fine_amount: 190.0,
        brand: 'Car 2 brand',
        category_id: '',
      })
    ).rejects.toEqual(new AppError('License plate already in use'));
  });

  it('should be able to create a new car with available true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car name',
      description: 'Car description',
      daily_rate: 75.5,
      license_plate: 'ABC-12D3',
      fine_amount: 150.0,
      brand: 'Car brand',
      category_id: '',
    });

    const carByLicensePlate = await carsRepositoryInMemory.findByLicensePlate(
      car.license_plate
    );

    expect(carByLicensePlate.available).toBe(true);
  });
});
