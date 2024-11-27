// fileLoaderWorker.js
self.onmessage = (event) => {
  const file = event.data;
  const chunkSize = 1024 * 1024; // 1 MB chunks
  let offset = 0;

  function readNextChunk() {
    const reader = new FileReader();

    // Slice the file into chunks
    const chunk = file.slice(offset, offset + chunkSize);
    reader.readAsArrayBuffer(chunk);

    reader.onload = () => {
      // Post chunk data back to the main thread
      self.postMessage({ success: true, chunk: reader.result, offset });

      // If there's more to read, keep reading in chunks
      offset += chunkSize;
      if (offset < file.size) {
        setTimeout(readNextChunk, 0); // Yield back to the event loop to keep UI responsive
      } else {
        // Once all chunks are read, indicate the completion
        self.postMessage({ success: true, complete: true });
      }
    };

    reader.onerror = () => {
      // Handle read error
      self.postMessage({ success: false, error: 'File read failed.' });
    };
  }

  // Start reading the first chunk
  readNextChunk();
};
