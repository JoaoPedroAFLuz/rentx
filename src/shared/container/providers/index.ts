import { container } from 'tsyringe';

import { IDateProvider } from '@shared/container/providers/dateProvider/IDateProvider';
import { DayjsDateProvider } from '@shared/container/providers/dateProvider/implementations/DayjsDateProvider';
import { IMailProvider } from './mailProvider/IMailProvider';
import { EtherealMailProvider } from './mailProvider/implementations/EtherealMailProvider';
import { LocalStorageProvider } from './storageProvider/implementations/LocalStorageProvider';
import { IStorageProvider } from './storageProvider/IStorageProvider';
import { S3StorageProvider } from './storageProvider/implementations/S3StorageProvider';

container.registerSingleton<IDateProvider>(
  'DayjsDateProvider',
  DayjsDateProvider
);

container.registerInstance<IMailProvider>(
  'EtherealMailProvider',
  new EtherealMailProvider()
);

const diskStorage = {
  local: LocalStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  diskStorage[process.env.DISK]
);
