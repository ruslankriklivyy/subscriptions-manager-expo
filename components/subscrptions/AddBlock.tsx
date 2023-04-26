import { StyleSheet, View, Text, Modal, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';

export const AddBlock = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.addBtn}
        onPress={() => setIsModalVisible(true)}
      >
        <AntDesign name="pluscircleo" size={38} color="black" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(!isModalVisible)}
      >
        <Text>1223</Text>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  addBtn: {
    width: 38,
    height: 38,
  },
});
