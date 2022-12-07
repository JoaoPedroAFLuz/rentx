import { CarImage } from '../infra/typeorm/entities/CarImage';

interface ICreateCarImage {
  car_id: string;
  image_name: string;
}

interface ICarsImagesRepository {
  create({ car_id, image_name }: ICreateCarImage): Promise<CarImage>;
}

export { ICarsImagesRepository, ICreateCarImage };
