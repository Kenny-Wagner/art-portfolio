import axios from 'axios'

const devHost = import.meta.env.VITE_BACKEND_URL || '';
const baseUrl = `${devHost}/api`;
import auth from './authService'

const resizeImage = (file) => {
    return new Promise((resolve, reject) => {
      const imageWorker = new Worker(new URL("../workers/resizeWorker.js", import.meta.url));
  
      // Send the file to the worker
      imageWorker.postMessage(file);
  
      // Listen for messages from the worker
      imageWorker.onmessage = (event) => {
        if (event.data.error) {
          reject(new Error(`Error ${event.data.error}`));
        } else {
          resolve(event.data); // Resolved with the resized file
        }
      };
  
      // Handle errors in the worker
      imageWorker.onerror = (error) => {
        reject(new Error(`Worker error: ${error.message}`));
      };
    });
  };
  
const uploadImage = async (imageData, onProgress, onComplete ) => {
        try {
            const formData = new FormData();
            formData.append("file", imageData.file);
            formData.append("type", imageData.type)

            const response = await axios.post(`${baseUrl}/image/`, 
                formData, 
                { headers: { 'Authorization': `Bearer ${auth.getToken()}`},
                  onUploadProgress: onProgress }
            )
            
            onComplete()
            return response.data.imageUrl;
        } catch (err) {
            console.log(`ERROR: ${err.message}`)
        }
};

export default { uploadImage, resizeImage };