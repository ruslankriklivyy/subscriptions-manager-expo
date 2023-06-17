import { Dimensions, Modal, View } from 'react-native';
import { ReactNode, FC } from 'react';

interface IMainModalProps {
  isModalVisible: boolean;
  children: ReactNode;
  onClose: () => void;
}

export const MainModal: FC<IMainModalProps> = ({ children, isModalVisible, onClose }) => {
  return (
    <Modal
      transparent
      animationType="slide"
      visible={isModalVisible}
      onRequestClose={() => onClose()}
    >
      <View style={{ height: Dimensions.get('window').height, backgroundColor: '#fff' }}>
        {children}
      </View>
    </Modal>
  );
};
