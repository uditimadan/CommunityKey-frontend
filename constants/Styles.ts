import Colors from '@/constants/Colors';
import { StyleSheet } from 'react-native';

export const defaultStyles = StyleSheet.create({
  btn: {
    height: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  pageContainer: {
    flex: 1,
    backgroundColor: Colors.light,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  inputcontainer:{
    flex: 1,
    backgroundColor:"#E0E0E0",
    padding: 16,
  },
  logincontainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  header: {
    fontSize: 40,
    fontWeight: '700',
    color: "#000",
    marginBottom: 10,
    marginTop: 30,
  },
  Signupheader: {
    fontSize: 40,
    fontWeight: '700',
    color: "#000",
    marginBottom: 10,
    marginTop: 30,
  },
  Loginheader: {
    fontSize: 40,
    fontWeight: '700',
    color: "#000",
    marginBottom: 10,
    marginTop: 30,
  },
  pillButton: {
    padding: 10,
    height: 60,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textLink: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: '500',
  },
  descriptionText: {
    fontSize: 18,
    marginTop: 20,
    color: Colors.white,
  },
  signupdescriptionText: {
    fontSize: 18,
    marginTop: 20,
    color: "#000",
  },
  logindescriptionText: {
    fontSize: 18,
    marginTop: 20,
    color: "#000",
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  pillButtonSmall: {
    paddingHorizontal: 20,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTextSmall: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 20,
    marginBottom: 10,
  },
  block: {
    marginHorizontal: 20,
    padding: 14,
    backgroundColor: '#fff',
    borderRadius: 16,
    gap: 20,
  },
});
