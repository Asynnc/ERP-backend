import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp', 'uploads')

export default {
  directory: tmpFolder,
  storage: multer.diskStorage({
    // Rota para onde o arquivo será salvo
    destination: tmpFolder,
    // O nome do arquivo onde será salvo
    filename(request, file, callback) {

      // Manter o nome do arquivo único
      // Hash em hexadecimal
      const filehash = crypto.randomBytes(10).toString('hex');
      // Nome do arquivo
      const fileName = ` ${filehash}-${file.originalname} `

      return callback(null, fileName);
    }
  })
}
