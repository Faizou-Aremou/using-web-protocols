const fs = require('fs');
const http = require('http');
const path = require('path');
const { get, error } = require('../http-server/utils');
const form = fs.readFileSync(path.join(__dirname, 'public', 'form.html'));
const { formidable } = require('formidable');

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    get(res, form);
    return;
  }
  if (req.method === 'POST') {
    post(req, res);
    return;
  }
  error(405, res);
});
server.listen(3000);

function post(req, res) {
  if (!/multipart\/form-data/.test(req.headers['content-type'])) {
    error(415, res);
    return;
  }
  const form = formidable({
    //Configuration de formidable
    multiples: true,
    uploadDir: './uploads',
  });

  form.parse(req, (err, fields, files) => {
    if (err) return err;
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    res.end(JSON.stringify({ fields, files }));
  });
}
