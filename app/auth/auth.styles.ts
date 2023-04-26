import { StyleSheet } from 'react-native';

export const authStyles = StyleSheet.create({
  box: {
    padding: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontWeight: '700',
    fontSize: 34,
    marginBottom: 40,
  },
  formControl: {
    marginBottom: 20,
  },
  formActions: {},
  linkToSingIn: {
    flexDirection: 'row',
    marginTop: 10,
  },
  text: {
    fontFamily: 'Poppins-Regular',
  },
  link: {
    marginLeft: 3,
    fontFamily: 'Poppins-Regular',
    color: '#004EEC',
  },
});
