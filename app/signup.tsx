import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import axios from 'axios';  // Import axios for making HTTP requests
import { HelloWave } from '@/components/HelloWave';

const Page = () => {
  const [countryCode, setCountryCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('');
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 80 : 0;
  const router = useRouter();
  //const { signUp } = useSignUp();

  const onSignup = async () => {
     const fullPhoneNumber = `${countryCode}${phoneNumber}`;
     //router.push({ pathname: '/verify/[phone]', params: { phone: fullPhoneNumber } });
     
    try {
      await axios.get(`http://127.0.0.1:8000/api/send_otp`, {
        params: {
          phone: fullPhoneNumber,
        },
      });
      router.push({ pathname: '/verify/[phone]', params: { phone: fullPhoneNumber } });
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={keyboardVerticalOffset}>
      <View style={defaultStyles.container}>
      <Text style={defaultStyles.header}>Sign Up <HelloWave/> </Text>
        <Text style={defaultStyles.signupdescriptionText}>
          Enter your phone number. We will send you a confirmation code for you 
          to begin your futuristic living!
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Country code"
            placeholderTextColor={Colors.black}
            value={countryCode}
          />
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Mobile number"
            placeholderTextColor={Colors.white}
            keyboardType="numeric"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>

        <Link href={'/login'} replace asChild>
          <TouchableOpacity>
            <Text style={defaultStyles.textLink}>Already have an account? Log in</Text>
          </TouchableOpacity>
        </Link>

        <View style={{ flex: 1 }} />

        <TouchableOpacity
          style={[
            defaultStyles.pillButton,
            phoneNumber !== '' ? styles.enabled : styles.disabled,
            { marginBottom: 20 },
          ]}
          onPress={onSignup}>
          <Text style={defaultStyles.buttonText}>Send OTP</Text>
        </TouchableOpacity>

      </View>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 40,
    flexDirection: 'row',
  },
  input: {
    backgroundColor: Colors.input,
    padding: 20,
    borderRadius: 16,
    fontSize: 20,
    marginRight: 10,
  },
  enabled: {
    backgroundColor: Colors.white,
  },
  disabled: {
    backgroundColor: Colors.white,
  },
});
export default Page;
