import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase.config";

const uploadPortfolio = async (file) => {
  console.log("File object:", file);
  const storageRef = ref(storage, `images/${file.name}`);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);

  return {
    fileName: file.name,
    downloadURL: downloadURL,
  };
};

export default uploadPortfolio;
