const { SMTPServer } = require('smtp-server');

const PORT = 4321;
const server = new SMTPServer({
  disabledCommands: ['STARTTLS', 'AUTH'],
  logger: true,
});
server.on('error', (err) => {
  console.log(err);
});

server.listen(PORT);