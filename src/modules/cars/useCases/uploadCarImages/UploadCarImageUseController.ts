import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UploadCarImageUseCase } from './UploadCarImageUseCase';

interface IFile {
  filename: string;
}

class UploadCarImagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const images = request.files as IFile[];
    console.log('🚀 ~ images', images);

    const uploadCarImageUseCase = container.resolve(UploadCarImageUseCase);

    const fileNames = images.map((file) => file.filename);

    await uploadCarImageUseCase.execute({
      car_id: id,
      images_name: fileNames,
    });

    return response.sendStatus(201);
  }
}

export { UploadCarImagesController };
