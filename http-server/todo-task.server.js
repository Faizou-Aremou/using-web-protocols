const http = require('http');
const { error } = require('./utils');
const HOSTNAME = process.env.HOSTNAME || '0.0.0.0';
const PORT = process.env.PORT || 3000;

console.log('hostname', process.env.HOSTNAME, 'hostport', process.env.PORT);

const server = http.createServer((req, res) => {
  if (req.method !== 'GET') return error(res, 405);
  if (req.url === '/todo') return todo(res);
  if (req.url === '/') return index(res);
  error(res, 404);
});

server.listen(PORT, HOSTNAME, () => {
  console.log(`server is listening on port ${server.address().port}`);
});

function todo(res) {
  res.end(JSON.stringify([{ task_id: 1, description: 'walk dog' }]));
}

function index(res) {
  res.end(JSON.stringify({ name: 'todo-server' }));
}
