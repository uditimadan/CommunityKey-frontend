import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const BottomLoginSheet = () => {
  const { bottom } = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: bottom }]}>
       <Link
        href={{
          pathname: '/signup',
        }}
        style={[defaultStyles.btn, styles.btnDark, styles.btnOutline]}
        asChild>
        <TouchableOpacity>
          {/* <Ionicons name="call" size={20} style={styles.btnIcon} color={'#fff'} /> */}
          <Text style={styles.btnDarkText}>Let's get started!</Text>
        </TouchableOpacity>
        </Link>
      {/* <Link
        href={{
          pathname: '/login',
        }}
        style={[defaultStyles.btn, styles.btnOutline]}
        asChild>
        <TouchableOpacity>
          <Text style={styles.btnDarkText}>Log in</Text>
        </TouchableOpacity>
      </Link> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#000',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 26,
    gap: 14,
  },
  btnLight: {
    backgroundColor: '#fff',
  },
  btnLightText: {
    color: '#000',
    fontSize: 20,
  },
  btnDark: {
    backgroundColor: Colors.dark,
  },
  btnDarkText: {
    color: '#fff',
    fontSize: 20,
  },
  btnOutline: {
    borderWidth: 1,
    borderColor: Colors.light,
  },
  btnIcon: {
    paddingRight: 6,
  },
});
export default BottomLoginSheet;