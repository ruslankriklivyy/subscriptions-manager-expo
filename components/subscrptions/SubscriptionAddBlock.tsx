import { useState } from 'react';

import { SubscriptionForm } from './SubscriptionForm';
import { AddButton } from '../UI/AddButton';
import { MainModal } from '../UI/MainModal';

export const SubscriptionAddBlock = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      <AddButton onPress={() => setIsModalVisible(true)} />

      <MainModal isModalVisible={isModalVisible} onClose={() => setIsModalVisible(!isModalVisible)}>
        <SubscriptionForm onClose={() => setIsModalVisible(false)} />
      </MainModal>
    </>
  );
};
