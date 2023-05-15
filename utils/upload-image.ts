import { Chance } from 'chance';
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';

import { storage } from '../config/firebase';

export const uploadImage = async (file: any) => {
  if (!file) return null;

  const response = await fetch(file.uri);
  const blob = await response.blob();
  const uriComponents = file.uri.split('.');
  const fileExtension = uriComponents[uriComponents.length - 1];
  const filePath = `images/${Chance().string({ length: 12 })}.${fileExtension}`;
  const storageRef = ref(storage, filePath);

  await uploadBytes(storageRef, blob);

  const url = await getDownloadURL(ref(storage, filePath));

  return { url, path: filePath };
};
