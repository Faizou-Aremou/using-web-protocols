const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'localHost',
  port: 4321,
});

transporter.sendMail(
  {
    from: 'beth@example.com',
    to: 'faizouaremou@gmail.com',
    subject: 'Hello',
    text: 'Hello world!',
  },
  (err, info) => {
    if (err) {
      console.log(err);
    }
    console.log('message Sent:', info);
  }
);
