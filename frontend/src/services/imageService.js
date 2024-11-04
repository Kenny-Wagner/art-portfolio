import axios from 'axios'

const devHost = import.meta.env.VITE_BACKEND_URL || '';
const baseUrl = `${devHost}/api`;

const uploadImage = async (imageData, onProgress, onComplete ) => {
        try {
            const formData = new FormData();
            formData.append("file", imageData.file);
            formData.append("type", imageData.type)

            const response = await axios.post(`${baseUrl}/image/`, 
                formData, 
                { onUploadProgress: onProgress }
            )
            
            onComplete()
            return response.data.imageUrl;
        } catch (err) {
            console.log(`ERROR: ${err.message}`)
        }
};

export default { uploadImage };