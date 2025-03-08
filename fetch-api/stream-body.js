/**
 * This an example of how to handle big JSON data from api.
 *  
 * streamBody: is An asynchronous function for streaming the body of a Response object
 *  obtained from a fetch() request. Pass the Response object as the first
 * argument followed by two optional callbacks.
 * If you specify a function as the second argument, that reportProgress
 * callback will be called once for each chunk that is received. The first
 * argument passed is the total number of bytes received so far. The second
 * argument is a number between 0 and 1 specifying how complete the download
 * is. If the Response object has no "Content-Length" header, however, then
 * this second argument will always be NaN.
 * If you want to process the data in chunks as they arrive, specify a
 * function as the third argument. The chunks will be passed, as Uint8Array
 * objects, to this processChunk callback.
 *
 * streamBody() returns a Promise that resolves to a string. If a processChunk
 * callback was supplied then this string is the concatenation of the values
 * returned by that callback. Otherwise the string is the concatenation of
 * the chunk values converted to UTF-8 strings.
 */

const response = await fetch('big.json');
const bodyText = await streamBody(response, reportProgress);
const jsonObject = JSON.parse(bodyText);

handleBigJSONObject(jsonObject);
async function streamBody(response, reportProgress, processChunk) {
  // How many bytes are we expecting, or NaN if no header
  let expectedBytes = parseInt(response.header.get('Content-Length'));
  let bytesRead = 0; // How many bytes received so far
  let reader = response.body.getReader(); // Read bytes with this function
  let decoder = new TextDecoder('utf-8'); // For converting bytes to text
  let body = ''; // Text read so far

  while (true) { // this loop could be replace by for await loop it is already possible in nodeJs streams
    let { done, value } = await reader.read(); // Read a chunk
    if (value) {
      // if i got a byte array
      if (processCHunk) {
        let processed = processChunk(value); // a callback was passed
        if (processed) {
          body += processed;
        }
      } else {
        // Otherwise, convert bytes
        body += decoder.decode(value, { stream: true });
      }
      if (reportProgress) {
        // if a progress callback was
        reportProgress(bytesRead, bytesRead / expectedBytes);
      }
    }
    if (done) {
      break;
    }
  }
  return body;
}

function handleBigJSONObject(jsonObject) {}

function reportProgress(bytesRead, percentage) {}
