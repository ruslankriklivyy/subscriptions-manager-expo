import { MainButton } from './MainButton';
import { AntDesign } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

export const FormSocials = () => {
  return (
    <View style={styles.socials}>
      <MainButton
        title={'Sign up with Google'}
        type={'outlined'}
        Icon={<AntDesign name="google" size={26} />}
        onPress={() => null}
      />

      <View style={styles.socialsBottom}>
        <View style={styles.socialsBottomLine}></View>
        <Text style={styles.socialsBottomText}>OR</Text>
        <View style={styles.socialsBottomLine}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  socials: {},
  socialsBottom: {
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  socialsBottomLine: {
    width: '42%',
    height: 2,
    backgroundColor: '#f3f3f3',
  },
  socialsBottomText: {
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    fontSize: 16,
    opacity: 0.6,
    marginHorizontal: 15,
  },
});
