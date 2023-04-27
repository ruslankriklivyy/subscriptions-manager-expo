import { StyleSheet, View, Image, Pressable, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState, FC } from 'react';
import { AntDesign } from '@expo/vector-icons';

import { MainLabel } from './MainLabel';

interface IUploadImageProps {
  onChange: (file: any) => void;
  label?: string;
}

export const UploadImage: FC<IUploadImageProps> = ({ onChange, label }) => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      allowsMultipleSelection: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      onChange(result.assets[0]);
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.box}>
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
  box: {},
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
    fontSize: 16,
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
