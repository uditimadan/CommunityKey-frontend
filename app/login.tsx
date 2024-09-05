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
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';  // Import axios for making HTTP requests
import { HelloWave } from '@/components/HelloWave';

enum SignInType {
  Phone,
  Email,
}

const Page = () => {
  const [countryCode, setCountryCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('');
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 80 : 0;
  const router = useRouter();

  const onSignIn = async (type: SignInType) => {
    if (type === SignInType.Phone) {
      try {
        const fullPhoneNumber = `${countryCode}${phoneNumber}`;

        //Send OTP using Django backend
        const response = await axios.get(`http://127.0.0.1:8000/api/send_otp/`, {
          params: {
            phone: fullPhoneNumber,
          },
        });

        if (response.data.status === 'OTP sent') {
          router.push({
            pathname: '/verify/[phone]',
            params: { phone: fullPhoneNumber },
          });
        } else {
          console.log('Failed to send OTP:', response.data.error);
        }
      } catch (error) {
        console.error('Error sending OTP:', error);
       }
     }else if (type === SignInType.Email) {
      router.push({ pathname: '/verify/email' });
     }
   };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={keyboardVerticalOffset}>
      <View style={defaultStyles.logincontainer}>
        <Text style={defaultStyles.header}>Welcome back <HelloWave/> </Text>
        <Text style={defaultStyles.logindescriptionText}>
          Enter the phone number associated with your account
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Country code"
            placeholderTextColor={Colors.grey}
            value={countryCode}
            onChangeText={setCountryCode}
          />
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Mobile number"
            placeholderTextColor={Colors.grey}
            keyboardType="numeric"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>

        <TouchableOpacity
          style={[
            defaultStyles.pillButton,
            phoneNumber !== '' ? styles.enabled : styles.disabled,
            { marginBottom: 20 },
          ]}
          onPress={() => onSignIn(SignInType.Phone)}>
          <Text style={defaultStyles.buttonText}>Continue</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <View
            style={{ flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: Colors.light }}
          />
          <Text style={{ color: Colors.black, fontSize: 20 }}>or</Text>
          <View
            style={{ flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: Colors.light }}
          />
        </View>

        <TouchableOpacity
          onPress={() => onSignIn(SignInType.Email)}
          style={[
            defaultStyles.pillButton,
            {
              flexDirection: 'row',
              gap: 16,
              marginTop: 20,
              backgroundColor: '#E0E0E0',
            },
          ]}>
          <Ionicons name="mail" size={24} color={'#000'} />
          <Text style={[defaultStyles.buttonText, { color: '#000' }]}>Continue with email </Text>
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
    backgroundColor: "#E0E0E0",
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