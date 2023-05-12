import sharp from 'sharp';
import { writeFile } from 'fs/promises';
import { ERRORS } from '../constants.js';

export async function createThumbnail(imagePath, outputPath) {
  const thumbnail = await sharp(imagePath)
    .resize(350)
    .toFormat('webp', { lossless: false })
    .toBuffer();
  
  if(!thumbnail || thumbnail.length === 0) {
    // Failed to generate thumbnail
    throw new ERRORS.OPERATION_FAILED;
  }
  
  if(outputPath) {
    await writeFile(outputPath, thumbnail, 'utf8');
  }

  return thumbnail;
}
