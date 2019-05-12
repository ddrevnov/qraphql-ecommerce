import * as nodemailer from 'nodemailer';
import { MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASSWORD } from '../config';

class MailService {
  constructor(private transport?: nodemailer.Transporter) {
    this.transport =
      transport ||
      nodemailer.createTransport({
        host: MAIL_HOST,
        port: MAIL_PORT,
        auth: {
          user: MAIL_USER,
          pass: MAIL_PASSWORD
        }
      } as any);
  }

  sendMail({ from, to, subject, html }) {
    return this.transport.sendMail({
      from,
      to,
      subject,
      html
    });
  }
}

export default MailService;
