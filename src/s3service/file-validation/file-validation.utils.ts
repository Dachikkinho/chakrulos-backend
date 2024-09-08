import { HttpException, HttpStatus } from "@nestjs/common";
import { extname } from "path";

export function validateFile(req, file: Express.Multer.File, callback): void {
  const ext = extname(file.originalname).toLowerCase();

  if (file.fieldname === 'image') {
    const allowedImageTypes = ['.jpeg', '.jpg', '.png'];
    if (!allowedImageTypes.includes(ext)) {
      return callback(
        new HttpException(
          `Invalid image file type. Only ${allowedImageTypes} images are allowed.`,
          HttpStatus.UNPROCESSABLE_ENTITY,
        ),
        false,
      );
    }
  } else if (file.fieldname === 'file') {
    const allowedFileTypes = ['.mp3'];
    if (!allowedFileTypes.includes(ext)) {
      return callback(
        new HttpException(
          'Invalid file type. Only MP3 files are allowed.',
          HttpStatus.UNPROCESSABLE_ENTITY,
        ),
        false,
      );
    }
  }

  callback(null, true);
}