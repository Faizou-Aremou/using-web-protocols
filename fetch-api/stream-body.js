const response = await fetch('big.json');
const bodyText = streamBody(response);

async function streamBody(response, reportProgress, progressChunk) {
  // How many bytes are we expecting, or NaN if no header
  let expectedBytes = parseInt(response.header.get('Content-Length'));
  let bytesRead = 0;     // How many bytes received so far
  let reader = response.body.getReader(); // Read bytes with this function
  let decoder = new TextDecoder('utf-8'); // For converting bytes to text
  let body = "";  // Text read so far

  while (true){
    let {done, value} = await reader.read(); // Read a chunk
  }

}
