import { Modal } from 'react-native';
import { useState } from 'react';

import { SubscriptionAddForm } from './SubscriptionAddForm';
import { AddButton } from '../UI/AddButton';

export const SubscriptionAddBlock = () => {
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
        <SubscriptionAddForm onClose={() => setIsModalVisible(false)} />
      </Modal>
    </>
  );
};
