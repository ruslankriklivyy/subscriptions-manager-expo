import { useState } from 'react';
import { Modal } from 'react-native';

import { AddButton } from '../UI/AddButton';
import { TransactionAddForm } from './TransactionAddForm';

export const AddTransactionBlock = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      <AddButton onPress={() => setIsModalVisible(true)} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(!isModalVisible)}
      >
        <TransactionAddForm onClose={() => setIsModalVisible(false)} />
      </Modal>
    </>
  );
};
