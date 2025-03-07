const http = require('http');
const fs = require('fs');
const path = require('path');
const { error, get } = require('./utils');

const form = fs.readFileSync(path.join(__dirname, 'public', 'form.html'));
const success = fs.readFileSync(path.join(__dirname, 'public', 'success.html'));

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
  if (req.headers['content-type'] !== 'application/json') {
    error(415, res);
    return;
  }

  let input = '';
  req.on('data', (data) => {
    input += data.toString();
  });
  res.writeHead(200, {
    'Content-Type': 'application/json',
  });
  req.on('end', () => {
    console.log(input);
    const parsed = JSON.parse(input);
    if(parsed.err){
      error("Bad Request", 400);
      return;
    }

    console.log("Received data: ", parsed);
    res.end('{"data": ' + input + "}");
  });
}
