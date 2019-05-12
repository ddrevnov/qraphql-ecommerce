import * as shortid from 'shortid';
import { createWriteStream } from 'fs';
import { UPLOAD_DIR } from '../config';

export default class FileUpload {
  constructor(private image: any, private uploadDir: string = UPLOAD_DIR) {}

  async storeUpload({ stream, filename }): Promise<any> {
    const id = shortid.generate();
    const fileName = this.getFileName(id, filename);
    const path = `${this.uploadDir}/${fileName}`;

    return new Promise((resolve, reject) =>
      stream
        .pipe(createWriteStream(path))
        .on('finish', () => resolve({ id, path }))
        .on('error', reject)
    );
  }

  async processUpload(): Promise<string> {
    const { stream, filename, mimetype, encoding } = await this.image;
    const { id, path } = await this.storeUpload({ stream, filename });
    return this.getFileName(id, filename);
  }

  private getFileName(id: string, filename: string): string {
    return `${id}-${filename}`;
  }
}
