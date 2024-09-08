import { extname } from 'path';

export function getFileName(file: Express.Multer.File): string {
  const fileExt = extname(file.originalname).toLowerCase();
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  const filename = `${file.originalname.split('.')[0]}-${uniqueSuffix}${fileExt}`;

  return filename;
}
