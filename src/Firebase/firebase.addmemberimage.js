import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase.config";

const uploadImage3 = async (file) => {
  console.log("File object:", file);
  const storageRef = ref(storage, `images/${file.name}`);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  console.log("downloadURL:", downloadURL);
  return downloadURL;
};

export default uploadImage3;
