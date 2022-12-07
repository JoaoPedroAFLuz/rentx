import { Repository, getRepository } from 'typeorm';

import {
  ICarsImagesRepository,
  ICreateCarImage,
} from '@modules/cars/repositories/ICarsImagesRepository';
import { CarImage } from '../entities/CarImage';

class CarsImagesRepository implements ICarsImagesRepository {
  private repository: Repository<CarImage>;

  constructor() {
    this.repository = getRepository(CarImage);
  }

  async create({ car_id, image_name }: ICreateCarImage): Promise<CarImage> {
    const newCarImage = this.repository.create({ car_id, image_name });

    return await this.repository.save(newCarImage);
  }
}

export { CarsImagesRepository };
