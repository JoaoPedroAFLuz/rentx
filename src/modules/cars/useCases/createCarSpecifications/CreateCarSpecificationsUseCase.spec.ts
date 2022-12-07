import { AppError } from '@shared/errors/AppError';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { CreateCarSpecificationsUseCase } from './CreateCarSpecificationsUseCase';
import { SpecificationsRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;
let createCarSpecificationUseCase: CreateCarSpecificationsUseCase;

describe('Create car specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationsUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    );
  });

  it('should be able to create a new specification to a car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car name',
      description: 'Car description',
      daily_rate: 75.5,
      license_plate: 'ABC-12D3',
      fine_amount: 150.0,
      brand: 'Car brand',
      category_id: '',
    });

    const specification1 = await specificationsRepositoryInMemory.create({
      name: 'Specification 1 name',
      description: 'Specification 1 description',
    });

    const specification2 = await specificationsRepositoryInMemory.create({
      name: 'Specification 2 name',
      description: 'Specification 2 description',
    });

    await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id: [specification1.id, specification2.id],
    });

    expect(car.specifications).toEqual([specification1, specification2]);
  });

  it('should not be able to create new specifications to a car that is not registered', async () => {
    expect(async () => {
      const car_id = '123';
      const specifications_id = ['54321'];

      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
