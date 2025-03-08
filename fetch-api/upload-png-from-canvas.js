// The canvas.toBlob() function is callback-based.

async function getCanvasBlob(canvas) {
  return new Promise((resolve, reject) => {
    canvas.toBlob(resolve);
  });
}

// Here is how we upload a PNG file from a canvas

async function uploadCanvasImage(canvas) {
  const pngblob = await getCanvasBlob(canvas);
  const formData = new FormData();
  formData.set('canvasimage', pngblob);
  const response = await fetch('/upload', {
    method: 'POST',
    body: formData,
  });
  let body = await response.json();
}
