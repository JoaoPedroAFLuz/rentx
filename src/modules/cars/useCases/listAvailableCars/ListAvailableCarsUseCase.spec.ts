import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { CreateCarUseCase } from '../createCar/CreateCarUseCase';
import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let createCarUseCase: CreateCarUseCase;

describe('List all available cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it('should be able to list all available cars', async () => {
    const car1 = await createCarUseCase.execute({
      name: 'Car 1 name',
      description: 'Car 2 description',
      daily_rate: 75.5,
      license_plate: 'AAA-11A1',
      fine_amount: 150.0,
      brand: 'Car 1 brand',
      category_id: 'category_id',
    });

    const car2 = await createCarUseCase.execute({
      name: 'Car 2 name',
      description: 'Car 2 description',
      daily_rate: 75.5,
      license_plate: 'BBB-22B2',
      fine_amount: 150.0,
      brand: 'Car 2 brand',
      category_id: 'category_id',
    });

    const availableCars = await listAvailableCarsUseCase.execute({});

    expect(availableCars).toEqual([car1, car2]);
  });

  it('should be able to list all available cars by name', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const car1 = await createCarUseCase.execute({
      name: 'Car 1 name',
      description: 'Car 2 description',
      daily_rate: 75.5,
      license_plate: 'AAA-11A1',
      fine_amount: 150.0,
      brand: 'Car 1 brand',
      category_id: 'category_id',
    });

    const car2 = await createCarUseCase.execute({
      name: 'Car 2 name',
      description: 'Car 2 description',
      daily_rate: 75.5,
      license_plate: 'BBB-22B2',
      fine_amount: 150.0,
      brand: 'Car 2 brand',
      category_id: 'category_id',
    });

    const availableCars = await listAvailableCarsUseCase.execute({
      name: car2.name,
    });

    expect(availableCars).toEqual([car2]);
  });

  it('should be able to list all available cars by brand', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const car1 = await createCarUseCase.execute({
      name: 'Car 1 name',
      description: 'Car 2 description',
      daily_rate: 75.5,
      license_plate: 'AAA-11A1',
      fine_amount: 150.0,
      brand: 'Car 1 brand',
      category_id: 'category_id',
    });

    const car2 = await createCarUseCase.execute({
      name: 'Car 2 name',
      description: 'Car 2 description',
      daily_rate: 75.5,
      license_plate: 'BBB-22B2',
      fine_amount: 150.0,
      brand: 'Car 2 brand',
      category_id: 'category_id',
    });

    const availableCars = await listAvailableCarsUseCase.execute({
      brand: car2.brand,
    });

    expect(availableCars).toEqual([car2]);
  });

  it('should be able to list all available cars by category', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const car1 = await createCarUseCase.execute({
      name: 'Car 1 name',
      description: 'Car 2 description',
      daily_rate: 75.5,
      license_plate: 'AAA-11A1',
      fine_amount: 150.0,
      brand: 'Car 1 brand',
      category_id: '12345',
    });

    const car2 = await createCarUseCase.execute({
      name: 'Car 2 name',
      description: 'Car 2 description',
      daily_rate: 75.5,
      license_plate: 'BBB-22B2',
      fine_amount: 150.0,
      brand: 'Car 2 brand',
      category_id: '54321',
    });

    const availableCars = await listAvailableCarsUseCase.execute({
      category_id: car2.category_id,
    });

    expect(availableCars).toEqual([car2]);
  });
});
