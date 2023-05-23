const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

exports.uploads = (file, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file,
      {
        folder: folder,
        overwrite: true,
        invalidate: true,
        resource_type: "auto",
        transformation: [{ flags: "attachment" }],
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {  
          resolve({
            url: result.secure_url,
            id: result.public_id
          });
        }
      }
    );
  });
};

exports.destroy = (publicId) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, { invalidate: true }, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};
