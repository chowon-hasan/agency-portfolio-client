// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { storage } from "./firebase.config";

// const generateFileName = (file) => {
//   const timestamp = Date.now();
//   const randomString = Math.random().toString(36).substring(2, 12);
//   const fileName = `${timestamp}_${randomString}_${file.name}`;
//   return fileName;
// };

// const uploadImage = async (file) => {
//   try {
//     if (!file) {
//       throw new Error("File is undefined or null");
//     }

//     const fileName = generateFileName(file);
//     const storageRef = ref(storage, `images/${fileName}`);
//     await uploadBytes(storageRef, file);
//     const downloadURL = await getDownloadURL(storageRef);

//     return downloadURL;
//   } catch (error) {
//     console.error("Error uploading image:", error);
//     throw error; // Rethrow the error to be caught by the caller
//   }
// };

// export default uploadImage;

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase.config";

const uploadImage = async (file) => {
  console.log("File object:", file);
  const storageRef = ref(storage, `images/${file.name}`);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);

  return {
    fileName: file.name,
    downloadURL: downloadURL,
  };
};

export default uploadImage;

// rules_version = '2';

// service firebase.storage {
//   match /b/{bucket}/o {
//     match /images/{imageFile} {
//       allow read, write: if request.auth != null && request.auth.token.email == "chowonhasan7@gmail.com";
//     }
//   }
// }
