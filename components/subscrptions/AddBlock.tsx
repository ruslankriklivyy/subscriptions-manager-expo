import { StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import { useState } from 'react';

import { AddForm } from './AddForm';

export const AddBlock = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.addBtn}
        onPress={() => setIsModalVisible(true)}
      >
        <EvilIcons name="plus" size={50} color="black" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(!isModalVisible)}
      >
        <AddForm onClose={() => setIsModalVisible(false)} />
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  addBtn: {
    width: 50,
    height: 50,
  },
});
