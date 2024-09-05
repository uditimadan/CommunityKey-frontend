import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { Fragment, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import axios from 'axios';

const CELL_COUNT = 6;

const Page = () => {
  const { phone } = useLocalSearchParams<{ phone: string }>();
  const [code, setCode] = useState('');
  const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });
  const router = useRouter();

  useEffect(() => {
    if (code.length === 6) {
      verifyCode();
    }
  }, [code]);

  const verifyCode = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/verify_otp/`, {
        params: {
          phone,
          otp: code,
        },
      });

      if (response.data.status === 'OTP verified') {
        Alert.alert('Success', 'OTP verified successfully!', [
          {
            text: 'OK',
            onPress: () => {
              // Navigate to the home page after successful verification
              router.replace('/(auth)/(tabs)/home');
            },
          },
        ]);
      } else {
        Alert.alert('Error', 'Failed to verify OTP.');
      }
    } catch (err) {
      console.error('Error verifying OTP:', err);
      Alert.alert('Error', 'An error occurred while verifying OTP.');
    }
  };

  return (
    <View style={defaultStyles.container}>
      <Text style={defaultStyles.header}>6-digit code</Text>
      <Text style={defaultStyles.descriptionText}>
        Code sent to {phone} unless you already have an account
      </Text>

      <CodeField
        ref={ref}
        {...props}
        value={code}
        onChangeText={setCode}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <Fragment key={index}>
            <View
              onLayout={getCellOnLayoutHandler(index)}
              key={index}
              style={[styles.cellRoot, isFocused && styles.focusCell]}>
              <Text style={styles.cellText}>{symbol || (isFocused ? <Cursor /> : null)}</Text>
            </View>
            {index === 2 ? <View key={`separator-${index}`} style={styles.separator} /> : null}
          </Fragment>
        )}
      />

      <Link href={'/login'} replace asChild>
        <TouchableOpacity>
          <Text style={[defaultStyles.textLink]}>Already have an account? Log in</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  codeFieldRoot: {
    marginVertical: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    gap: 12,
  },
  cellRoot: {
    width: 45,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#E0E0E0",
    borderRadius: 8,
  },
  cellText: {
    color: '#000',
    fontSize: 36,
    textAlign: 'center',
  },
  focusCell: {
    paddingBottom: 8,
  },
  separator: {
    height: 2,
    width: 10,
    backgroundColor: "#000",
    alignSelf: 'center',
  },
});

export default Page;