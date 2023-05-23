import { Modal } from 'react-native';
import { ReactNode, FC } from 'react';

interface IMainModalProps {
  isModalVisible: boolean;
  children: ReactNode;
  onClose: () => void;
}

export const MainModal: FC<IMainModalProps> = ({ children, isModalVisible, onClose }) => {
  return (
    <Modal
      animationType="slide"
      visible={isModalVisible}
      onRequestClose={() => onClose()}
      presentationStyle={'fullScreen'}
    >
      {children}
    </Modal>
  );
};
