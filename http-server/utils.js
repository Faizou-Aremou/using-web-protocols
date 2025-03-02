module.exports.error = (res, code,) => {
  res.statusCode = code;
  res.end(JSON.stringify({ error: 'error' }));
};
module.exports.get = (res, form) => {
  res.writeHead(200, {
    'Content-Type': 'text/html',
  });
  res.end(form);
};
