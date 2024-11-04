import axios from 'axios'

const devHost = import.meta.env.VITE_BACKEND_URL || '';
const baseUrl = `${devHost}/api`;

const uploadImage = async ( imageData, updateId, onProgress, onComplete ) => {
        try {
            const formData = new FormData();
            formData.append("file", imageData.file);
            formData.append("type", imageData.type)

            let response = null;
            if(updateId) {
                response = await axios.put(`${baseUrl}/image/${updateId}`, 
                    formData, 
                    { onUploadProgress: onProgress }
                )
            } else {
                response = await axios.post(`${baseUrl}/image/`, 
                    formData, 
                    { onUploadProgress: onProgress }
                )
            }
            onComplete()
            return response.data;

        } catch (err) {
            console.log(`ERROR: ${err.message}`)
        }
};

export default { uploadImage };