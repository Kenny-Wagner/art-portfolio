import axios from 'axios'

const baseUrl = `/api`;

const getSignedUrl = async ({ key, content_type }) => {
    try {
        const response = await axios.post(`${baseUrl}/s3/signed_url`, {
            key, 
            content_type
        });
        return response.data.data
    }
    catch(err) {
        console.log(`error is ${err.message}`)
    }
}

const uploadFileToSignedUrl = async (
    signedUrl,
    file,
    contentType,
    onProgress,
    onComplete 
    ) => {
        try {
            await axios.put(signedUrl, file, {
            onUploadProgress: onProgress,
            headers: { "Content-Type": contentType }
            })
            onComplete()
        } catch (err) {
            console.log(`ERROR: ${err.message}`)
        }
};


export default { getSignedUrl, uploadFileToSignedUrl  };