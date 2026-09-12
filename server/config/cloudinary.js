const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadPdfBuffer = (buffer, folder, publicId, documentType) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'raw',
        folder,
        public_id: publicId,
        format: 'pdf',
        tags: [JSON.stringify({ documentType })]
      },
      (error, result) => (error ? reject(error) : resolve(result))
    );
    stream.end(buffer);
  });
};

const deleteAsset = async (publicId, resourceType = 'raw') => {
  if (!publicId) return;

  try {
    return await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
  } catch (error) {
    console.error(`Gagal menghapus aset Cloudinary (${publicId}):`, error.message);
  };
};

module.exports = { cloudinary, uploadPdfBuffer, deleteAsset };
