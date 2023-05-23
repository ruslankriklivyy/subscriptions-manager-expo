import { StyleSheet, View, Image, Pressable, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState, FC, useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';

import { MainLabel } from './MainLabel';

interface IUploadImageProps {
  onChange: (file: any) => void;
  defaultValue?: any;
  label?: string;
}

export const UploadImage: FC<IUploadImageProps> = ({ onChange, label, defaultValue }) => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      allowsMultipleSelection: false,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      onChange(result.assets[0]);
      setImage(result.assets[0].uri);
    }
  };

  useEffect(() => {
    if (defaultValue) {
      setImage(defaultValue.url);
    }
  }, [defaultValue]);

  return (
    <View>
      {label && <MainLabel label={label} />}

      {!image && (
        <Pressable style={styles.pickImage} onPress={pickImage}>
          <Text style={styles.pickImageText}>Pick image</Text>
        </Pressable>
      )}

      {image && (
        <View style={styles.imageBox}>
          <Pressable style={styles.removeImage} onPress={() => setImage(null)}>
            <AntDesign name="close" size={20} color="black" />
          </Pressable>

          <Image style={styles.image} source={{ uri: image }} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  pickImage: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#f3f3f3',
    borderStyle: 'dotted',
    borderRadius: 8,
  },
  pickImageText: {
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    fontSize: 14,
    opacity: 0.4,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  imageBox: {
    width: 100,
    height: 100,
    position: 'relative',
  },
  removeImage: {
    position: 'absolute',
    right: 0,
    zIndex: 5,
    backgroundColor: 'red',
    borderBottomLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: 3,
  },
});
