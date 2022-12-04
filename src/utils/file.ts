import fs from 'fs';

const deleteFile = async (fileName: string) => {
  try {
    await fs.promises.stat(fileName);
  } catch (error) {
    return;
  }

  await fs.promises.unlink(fileName);
};

export { deleteFile };
