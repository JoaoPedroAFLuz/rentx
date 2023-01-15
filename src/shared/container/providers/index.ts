import { container } from 'tsyringe';

import { IDateProvider } from '@shared/container/providers/dateProvider/IDateProvider';
import { DayjsDateProvider } from '@shared/container/providers/dateProvider/implementations/DayjsDateProvider';
import { IMailProvider } from './mailProvider/IMailProvider';
import { EtherealMailProvider } from './mailProvider/implementations/EtherealMailProvider';

container.registerSingleton<IDateProvider>(
  'DayjsDateProvider',
  DayjsDateProvider
);

container.registerInstance<IMailProvider>(
  'EtherealMailProvider',
  new EtherealMailProvider()
);
