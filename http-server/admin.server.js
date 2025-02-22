const http = require('http');
const fs = require('fs');
const path = require('path');
const { error } = require('./utils');

const form = fs.readFileSync(path.join(__dirname, 'public', 'form.html'));
const success = fs.readFileSync(path.join(__dirname, 'public', 'success.html'));

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    get(res);
    return;
  }
  if (req.method === 'POST') {
    post(req, res);
    return;
  }
  error(405, res);
});

server.listen(3000);

function get(res) {
  res.writeHead(200, {
    'Content-Type': 'text/html',
  });
  res.end(form);
}

function post(req, res) {
  if (req.headers['content-type'] !== 'application/x-www-form-urlencoded') {
    error(415, res);
    return;
  }

  let input = '';
  req.on('data', (data) => {
    input += data.toString();
  });
  req.on('end', () => {
    console.log(input);
    res.end(success);
  });
}
