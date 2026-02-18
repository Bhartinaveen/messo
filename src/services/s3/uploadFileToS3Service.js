const uploadFileToS3Service = async (uploadUrl, fileBuffer, filetype) => {
    try{
        const response = await fetch(uploadUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': filetype,
            },
            body: fileBuffer,
        });
        if (!response.ok) {
            throw new Error('Failed to upload file to S3');
        }
    } catch(error){
        console.error(error);
        throw new Error(error?.message || 'File upload to S3 failed');
    }
}

export default uploadFileToS3Service;