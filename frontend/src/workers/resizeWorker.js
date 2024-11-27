onmessage = async (event) => {
    console.log('in onmessage');
    const file = event.data;
    const scale = 0.5;

    try {
        // Create an ImageBitmap from the file
        const imageBitmap = await createImageBitmap(file);

        // Create an OffscreenCanvas with the scaled dimensions
        const canvas = new OffscreenCanvas(imageBitmap.width * scale, imageBitmap.height * scale);
        const ctx = canvas.getContext('2d');

        // Draw the image on the canvas with the new dimensions
        ctx.drawImage(imageBitmap, 0, 0, canvas.width, canvas.height);

        // Convert the canvas to a Blob
        const imageBlob = await canvas.convertToBlob({ type: file.type, quality: 0.8 });

        console.log('about to postMessage in onmessage');
        postMessage(new File([imageBlob], file.name, { type: file.type }));

    } catch (error) {
        console.log('got error, sending error via postMessage');
        postMessage({ error: error.message });
    }
};
