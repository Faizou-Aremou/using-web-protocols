module.exports.error = (res, code) => {
  res.statusCode = code;
  res.end(JSON.stringify({ error: `${http.STATUS_CODES[code]}` }));
};
