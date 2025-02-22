const https = require('https');
const { Transform } = require('stream');
https.get('https://jsonplaceholder.typicode.com/todos/1', (res) => {
  const backLine = new Transform({
    transform(chunk, encoding, callback) {
      callback(null, chunk.toString() + '\n');
    },
  });
  res.pipe(backLine).pipe(process.stdout);
  process.stdout.write('\n');
});

const payload = JSON.stringify({ name: 'Beth', job: 'Software Engineer' });
const opts = {
  method: 'POST',
  hostname: 'postman-echo.com',
  path: '/post',
  header: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(payload),
  },
};

const req = https.request(opts, (res) => {
  process.stdout.write('Status Code: ' + res.statusCode + '\n');
  process.stdout.write('Body: ');
  res.pipe(process.stdout);
});

req.on('error', (err) => console.error('Error: ', err));

req.end(payload);
